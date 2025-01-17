import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const foodItemsData = [
  {
    id: 1,
    foodItem: 'Pasta',
    branch: 'WITP - D 4th Floor',
    date: '2024-07-02',
    price: '10',
    category: 'Lunch',
  },
  {
    id: 2,
    foodItem: 'Sandwich',
    branch: 'NYC - Downtown',
    date: '2024-07-01',
    price: '5',
    category: 'Snacks',
  },
  // Add more food items as needed
];

export default function ViewFoodItems({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [foodItems, setFoodItems] = useState(foodItemsData);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);

  // State for editing form fields
  const [editFoodItem, setEditFoodItem] = useState('');
  const [editBranch, setEditBranch] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editCategory, setEditCategory] = useState('');

  // Function to handle search
  const handleSearch = () => {
    const filteredFoodItems = foodItemsData.filter(item =>
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFoodItems(filteredFoodItems);
  };

  // Function to handle edit button click
  const handleEdit = (foodItem) => {
    setSelectedFoodItem(foodItem);
    setEditFoodItem(foodItem.foodItem);
    setEditBranch(foodItem.branch);
    setEditDate(foodItem.date);
    setEditPrice(foodItem.price);
    setEditCategory(foodItem.category);
    setEditModalVisible(true);
  };

  // Function to handle delete button click
  const handleDelete = (foodItem) => {
    setSelectedFoodItem(foodItem);
    setDeleteModalVisible(true);
  };

  // Function to confirm delete action
  const handleConfirmDelete = () => {
    const updatedFoodItems = foodItems.filter(item => item.id !== selectedFoodItem.id);
    setFoodItems(updatedFoodItems);
    setDeleteModalVisible(false);
  };

  // Function to confirm edit action
  const handleConfirmEdit = () => {
    const updatedFoodItems = foodItems.map(item =>
      item.id === selectedFoodItem.id
        ? { ...item, foodItem: editFoodItem, branch: editBranch, date: editDate, price: editPrice, category: editCategory }
        : item
    );
    setFoodItems(updatedFoodItems);
    setEditModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FeatherIcon name="chevron-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Food Items</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <FeatherIcon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchTextInput}
            placeholder="Search by food name..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>

      {/* Food Item Cards */}
      <ScrollView style={styles.cardContainer}>
        {foodItems.map(item => (
          <View key={item.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Food Item:</Text>
              <Text style={styles.value}>{item.foodItem}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Branch:</Text>
              <Text style={styles.value}>{item.branch}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.value}>{item.date}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Price:</Text>
              <Text style={styles.value}>{item.price}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Category:</Text>
              <Text style={styles.value}>{item.category}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Edit Modal */}
      <Modal
  animationType="slide"
  transparent={true}
  visible={editModalVisible}
  onRequestClose={() => setEditModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Edit Item</Text>
      <ScrollView>
        {/* Food Item */}
        <Text style={styles.inputLabel}>Food Item:</Text>
        <TextInput
          style={styles.inputField}
          value={editFoodItem}
          onChangeText={text => setEditFoodItem(text)}
        />

        {/* Branch */}
        <Text style={styles.inputLabel}>Branch:</Text>
        <TextInput
          style={styles.inputField}
          value={editBranch}
          onChangeText={text => setEditBranch(text)}
        />

        {/* Date */}
        <Text style={styles.inputLabel}>Date:</Text>
        <TextInput
          style={styles.inputField}
          value={editDate}
          onChangeText={text => setEditDate(text)}
        />

        {/* Price */}
        <Text style={styles.inputLabel}>Price:</Text>
        <TextInput
          style={styles.inputField}
          value={editPrice}
          onChangeText={text => setEditPrice(text)}
        />

        {/* Category */}
        <Text style={styles.inputLabel}>Category:</Text>
        <TextInput
          style={styles.inputField}
          value={editCategory}
          onChangeText={text => setEditCategory(text)}
        />

        {/* Buttons */}
        <View style={styles.modalButtons}>
          <TouchableOpacity
            style={[styles.modalButton, styles.saveButton]}
            onPress={handleConfirmEdit}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.cancelButton]}
            onPress={() => setEditModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  </View>
</Modal>


      {/* Delete Confirmation Modal */}
      <Modal
  animationType="slide"
  transparent={true}
  visible={deleteModalVisible}
  onRequestClose={() => setDeleteModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Confirm Delete</Text>
      {selectedFoodItem && (
        <Text style={styles.confirmText}>
          Are you sure you want to delete {selectedFoodItem.foodItem}?
        </Text>
      )}
      <View style={styles.modalButtons}>
        <TouchableOpacity
          style={[styles.modalButton, styles.saveButton]}
          onPress={handleConfirmDelete}
        >
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.modalButton, styles.cancelButton]}
          onPress={() => setDeleteModalVisible(false)}
        >
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

    </View>
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
  searchContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 12,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchTextInput: {
    flex: 1,
    height: 40,
    color: '#333',
    paddingHorizontal: 12,
  },
  input: {
    height: 60,
    color: '#333',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginTop: 8,
    textAlignVertical: 'center', // Align text vertically centered
    paddingVertical: 10, // Add padding to center the text vertically
  },
  cardContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  editButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: 'tomato',
  },
  saveButton: {
    backgroundColor: '#007bff',
  },
  formGroup: {
    width: '100%',
    marginBottom: 16,
  },
});