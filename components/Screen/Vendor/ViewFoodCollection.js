import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Alert, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const branchesData = [
  {
    id: 1,
    FoodName: 'Pasta',
    Discription: 'Breakfast',
    Type: 'Veg',
  },
  {
    id: 2,
    FoodName: 'Chicken Tandoor',
    Discription: 'Lunch',
    Type: 'Non-Veg',
  },
  // Add more branches as needed
];

export default function ViewFoodCollection({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [branches, setBranches] = useState(branchesData);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  // State for editing form fields
  const [editCountry, setEditCountry] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editBranchName, setEditBranchName] = useState('');

  // Function to handle search
  const handleSearch = () => {
    const filteredBranches = branchesData.filter(branch =>
      branch.FoodName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setBranches(filteredBranches);
  };

  // Function to handle edit button click
  const handleEdit = (branch) => {
    setSelectedBranch(branch);
    setEditCountry(branch.FoodName);
    setEditCity(branch.Discription);
    setEditBranchName(branch.Type);
    setEditModalVisible(true);
  };

  // Function to handle delete button click
  const handleDelete = (branch) => {
    setSelectedBranch(branch);
    setDeleteModalVisible(true);
  };

  // Function to confirm delete action
  const handleConfirmDelete = () => {
    const updatedBranches = branches.filter(branch => branch.id !== selectedBranch.id);
    setBranches(updatedBranches);
    setDeleteModalVisible(false);
  };

  // Function to confirm edit action
  const handleConfirmEdit = () => {
    const updatedBranches = branches.map(branch =>
      branch.id === selectedBranch.id
        ? { ...branch, FoodName: editCountry, Discription: editCity, Type: editBranchName }
        : branch
    );
    setBranches(updatedBranches);
    setEditModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FeatherIcon name="chevron-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Food Collections</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <FeatherIcon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchTextInput}
            placeholder="Search By Food Name..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            onSubmitEditing={handleSearch}
          />
        </View>
      </View>
      {/* Branch Cards */}
      <View style={styles.cardContainer}>
        {branches.map(branch => (
          <View key={branch.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Food Name:</Text>
              <Text style={styles.value}>{branch.FoodName}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Description:</Text>
              <Text style={styles.value}>{branch.Discription}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Type:</Text>
              <Text style={styles.value}>{branch.Type}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(branch)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(branch)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Edit Modal */}
      <Modal
  animationType="slide"
  transparent={true}
  visible={editModalVisible}
  onRequestClose={() => setEditModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Edit Food Collection</Text>
      <ScrollView>
        {/* Form for editing branch */}
        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Food Name:</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Food Name"
            value={editCountry}
            onChangeText={text => setEditCountry(text)}
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Description:</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Description"
            value={editCity}
            onChangeText={text => setEditCity(text)}
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.inputLabel}>Price:</Text>
          <TextInput
            style={styles.inputField}
            placeholder="Price"
            value={editBranchName}
            onChangeText={text => setEditBranchName(text)}
          />
        </View>

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
            {selectedBranch && (
              <Text style={styles.confirmText}>Are you sure you want to delete {selectedBranch.country} branch?</Text>
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
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
