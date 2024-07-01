import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TextInput, TouchableOpacity, Modal, FlatList, Picker } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker

export default function AddFoodItems({ navigation }) {
  const [form, setForm] = useState({
    foodItem: '',
    date: new Date(), // Default date is set to current date
    price: '',
    category: 'All day available',
  });

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All day available');
  const [datePickerVisible, setDatePickerVisible] = useState(false); // Define state for date picker visibility

  const handleChangeFoodItem = (foodItem) => {
    setForm({ ...form, foodItem });
  };

  const handleChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || form.date;
    setForm({ ...form, date: currentDate });
    setDatePickerVisible(false); // Hide date picker after selecting date
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
    // Simulate API call to submit food item
    console.log('Submitting food item with:', form);
    // Replace with actual logic to submit food item

    // Navigate back to previous screen after submission
    navigation.goBack();
  };

  const renderCategoryItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.pickerItem} onPress={() => handleChangeCategory(item)}>
        {item === selectedCategory ? (
          <MaterialIcon name={getCategoryIcon(item)} size={24} color="#007bff" style={styles.pickerItemIcon} />
        ) : (
          <MaterialIcon name={getCategoryIcon(item)} size={24} color="#ccc" style={styles.pickerItemIcon} />
        )}
        <Text style={styles.pickerItemText}>{item}</Text>
      </TouchableOpacity>
    );
  };

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
              <Text style={styles.inputLabel}>Food Item</Text>
              <Picker
                selectedValue={form.foodItem}
                style={styles.picker}
                onValueChange={(itemValue) => handleChangeFoodItem(itemValue)}
              >
                <Picker.Item label="Select food item..." value="" />
                <Picker.Item label="Food Item 1" value="Food Item 1" />
                <Picker.Item label="Food Item 2" value="Food Item 2" />
                <Picker.Item label="Food Item 3" value="Food Item 3" />
                {/* Add more items as needed */}
              </Picker>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Date</Text>
              <TouchableOpacity onPress={() => setDatePickerVisible(true)} style={styles.datePicker}>
                <Text>{form.date.toDateString()}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Price</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter price"
                keyboardType="numeric"
                value={form.price}
                onChangeText={handleChangePrice}
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

      {/* DateTimePicker */}
      {datePickerVisible && (
        <DateTimePicker
          value={form.date}
          mode="date"
          display="default"
          onChange={handleChangeDate}
          maximumDate={new Date()} // Optional: Set maximum date to prevent future dates
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
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
});
