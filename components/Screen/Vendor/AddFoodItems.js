import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, Modal, FlatList,Pressable} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

export default function AddFoodItems({ navigation }) {
  const [form, setForm] = useState({
 
    foodItem: [
      { label: 'Pune', value: 'pune' },
      { label: 'Mumbai', value: 'mumbai' },
      { label: 'Sangli', value: 'sangli' },
    ],
    date: null, 
    price: '',
    category: 'All day available',
  });

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All day available');
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);



const handleChangeDate = (event, selectedDate) => {
  const currentDate = selectedDate || form.date;
  setShowDatePicker(false);
  setForm({ ...form, date: currentDate });
};

const showDatepicker = () => {
  setShowDatePicker(true);
};




  const handleChangePrice = (price) => {
    setForm({ ...form, price });
  };

  const handleChangeCategory = (category) => {
    setSelectedCategory(category);
    setForm({ ...form, category });
    setCategoryModalVisible(false);
  };

  const handleSubmit = () => {
    console.log('Submitting food item with:', form);
    navigation.goBack();
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity style={styles.pickerItem} onPress={() => handleChangeCategory(item)}>
      <MaterialIcon name={getCategoryIcon(item)} size={24} color={item === selectedCategory ? "#007bff" : "#ccc"} style={styles.pickerItemIcon} />
      <Text style={styles.pickerItemText}>{item}</Text>
    </TouchableOpacity>
  );

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Breakfast':
        return 'breakfast-dining';
      case 'Lunch':
        return 'restaurant-menu';
      case 'Snacks':
        return 'local-pizza';
      case 'Dinner':
        return 'dinner-dining';
      case 'All day available':
        return 'all-inclusive';
      default:
        return 'help-outline';
    }
  };

  const toggleModal = () => {
    setForm({ ...form, isModalVisible: !form.isModalVisible });
  };
  const handleFoodChange = (itemValue) => {
    setForm({ ...form, selectedFood: itemValue });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Food Item</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Add New Food Item</Text>

          <View style={styles.formContainer}>
            
          <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Select Food</Text>
          <TouchableOpacity style={styles.selectFoodButton} onPress={toggleModal}>
            <Text>{form.selectedFood ? form.selectedFood : 'Select Food...'}</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={form.isModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Food</Text>
              <Picker
                selectedValue={form.selectedFood}
                style={styles.Foodpicker}
                onValueChange={handleFoodChange}
              >
                <Picker.Item label="Select Food..." value="" />
                {form.foodItem.map((foodItem) => (
                  <Picker.Item key={foodItem.value} label={foodItem.label} value={foodItem.value} />
                ))}
              </Picker>
              <Pressable style={styles.closeButton} onPress={toggleModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

          <View style={styles.inputContainer}>
  <Text style={styles.inputLabel}>Date</Text>
  <TouchableOpacity style={styles.picker} onPress={showDatepicker}>
    <MaterialIcon name="calendar-today" size={24} color="#007bff" style={styles.pickerItemIcon} />
    <Text style={styles.pickerText}>{form.date ? form.date.toDateString() : 'Select Date'}</Text>
  </TouchableOpacity>
  {showDatePicker && (
    <DateTimePicker
      value={form.date || new Date()}
      mode="date"
      display="default"
      onChange={handleChangeDate}
      style={{ alignSelf: 'flex-start',marginTop:5}}
      
    />
  )}
</View>


          

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Price</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter price"
                keyboardType="numeric"
                value={form.price}
                onChangeText={handleChangePrice}
                     placeholderTextColor="#6b7280"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Category</Text>
              <TouchableOpacity style={styles.picker} onPress={() => setCategoryModalVisible(true)}>
                <MaterialIcon name={getCategoryIcon(selectedCategory)} size={24} color="#007bff" style={styles.pickerItemIcon} />
                <Text style={styles.pickerText}>{selectedCategory}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={categoryModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Category</Text>
            <FlatList
              data={['Breakfast', 'Lunch', 'Snacks', 'Dinner', 'All day available']}
              renderItem={renderCategoryItem}
              keyExtractor={(item) => item}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setCategoryModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  sectionContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginBottom: 25,
  },
  formContainer: {
    marginTop: 12,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerText: {
    fontSize: 16,
    marginLeft: 8,
    color:'#6b7280'
  },
  pickerItemIcon: {
    marginRight: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  submitButton: {
    marginHorizontal: 24,
    marginTop: 24,
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  Foodpicker: {
   
    height: 200, // Adjust height as needed
    width: '100%',
    marginTop: -20,
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  pickerItemText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 24,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  selectFoodButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },

});
