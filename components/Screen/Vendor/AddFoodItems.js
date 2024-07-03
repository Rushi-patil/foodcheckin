import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, Modal, FlatList, Dimensions } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function AddFoodItems({ navigation }) {
  const [form, setForm] = useState({
    foodItem: '',
    branch: '',
    date: null,
    price: '',
    category: null,
  });

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const handleChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || form.date;
    setForm({ ...form, date: currentDate });
    setDatePickerVisible(false);
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
              <Text style={styles.inputLabel}>Date</Text>
              <TouchableOpacity onPress={() => setDatePickerVisible(true)} style={styles.datePicker}>
                {!form.date && (
                  <Text style={styles.placeholderText}>Select Date</Text>
                )}
                {form.date && (
                  <Text style={styles.datePickerText}>{form.date.toDateString()}</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Price</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Price"
                placeholderTextColor="#6b7280"
                keyboardType="numeric"
                value={form.price}
                onChangeText={handleChangePrice}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Category</Text>
              <TouchableOpacity style={styles.picker} onPress={() => setCategoryModalVisible(true)}>
                <MaterialIcon name={getCategoryIcon(selectedCategory)} size={24} color="#007bff" style={styles.pickerItemIcon} />
                {!selectedCategory && (
                  <Text style={styles.placeholderText}>Select Category</Text>
                )}
                {selectedCategory && (
                  <Text style={styles.pickerText}>{selectedCategory}</Text>
                )}
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

      {datePickerVisible && (
        <DateTimePicker
          value={form.date || new Date()}
          mode="date"
          display="default"
          onChange={handleChangeDate}
          maximumDate={new Date()}
          style={{ backgroundColor: '#fff' }}
        />
      )}
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
  datePicker: {
    width: windowWidth,
    backgroundColor: '#fff',
  },
  datePickerText: {
    fontSize: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: '#6b7280',
  },
});
