import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Alert, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const branchesData = [
  {
    id: 1,
    country: 'India',
    city: 'Pune',
    branchName: 'WITP - D 4th Floor',
  },
  {
    id: 2,
    country: 'United States',
    city: 'New York',
    branchName: 'NYC - Downtown',
  },
  // Add more branches as needed
];

export default function ViewBranches({ navigation }) {
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
      branch.country.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setBranches(filteredBranches);
  };

  // Function to handle edit button click
  const handleEdit = (branch) => {
    setSelectedBranch(branch);
    setEditCountry(branch.country);
    setEditCity(branch.city);
    setEditBranchName(branch.branchName);
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
        ? { ...branch, country: editCountry, city: editCity, branchName: editBranchName }
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
        <Text style={styles.headerTitle}>Company Branches</Text>
      </View>

      {/* Search Bar */}
  
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <FeatherIcon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchTextInput}
            placeholder="Search By Country..."
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
              <Text style={styles.label}>Country:</Text>
              <Text style={styles.value}>{branch.country}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>City:</Text>
              <Text style={styles.value}>{branch.city}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Branch:</Text>
              <Text style={styles.value}>{branch.branchName}</Text>
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
            <Text style={styles.modalTitle}>Edit Branch</Text>
            <ScrollView>

          
            {/* Form for editing branch */}

            <Text style={styles.inputLabel}>Country:</Text>
        <TextInput
          style={styles.inputField}
          value={editCountry}
          onChangeText={text => setEditCountry(text)}
        />

           
            
<Text style={styles.inputLabel}>Country:</Text>
        <TextInput
          style={styles.inputField}
              placeholder="City"
              value={editCity}
              onChangeText={text => setEditCity(text)}
        />


<Text style={styles.inputLabel}>Branch Name:</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Branch Name"
          value={editBranchName}
          onChangeText={text => setEditBranchName(text)}
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
