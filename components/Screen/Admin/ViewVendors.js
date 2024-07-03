import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Alert, CheckBox, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const vendorsData = [
  {
    id: 1,
    vendorName: 'ABC Inc.',
    email: 'abc@example.com',
    mobile: '123-456-7890',
    branchIds: [1], // Array of branch ids
  },
  {
    id: 2,
    vendorName: 'XYZ Corp.',
    email: 'xyz@example.com',
    mobile: '987-654-3210',
    branchIds: [1, 2], // Array of branch ids
  },
  // Add more vendors as needed
];

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

export default function ViewVendors({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [vendors, setVendors] = useState(vendorsData);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [editVendorName, setEditVendorName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editMobile, setEditMobile] = useState('');
  const [selectedBranchIds, setSelectedBranchIds] = useState([]);

  // Function to handle search
  const handleSearch = () => {
    const filteredVendors = vendorsData.filter(vendor =>
      vendor.vendorName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setVendors(filteredVendors);
  };

  // Function to handle edit button click
  const handleEdit = (vendor) => {
    setSelectedVendor(vendor);
    setEditVendorName(vendor.vendorName);
    setEditEmail(vendor.email);
    setEditMobile(vendor.mobile);
    setSelectedBranchIds(vendor.branchIds); // Initialize selected branch ids
    setEditModalVisible(true);
  };

  // Function to handle delete button click
  const handleDelete = (vendor) => {
    setSelectedVendor(vendor);
    setDeleteModalVisible(true);
  };

  // Function to confirm delete action
  const handleConfirmDelete = () => {
    const updatedVendors = vendors.filter(vendor => vendor.id !== selectedVendor.id);
    setVendors(updatedVendors);
    setDeleteModalVisible(false);
  };

  // Function to confirm edit action
  const handleConfirmEdit = () => {
    const updatedVendors = vendors.map(vendor =>
      vendor.id === selectedVendor.id
        ? { ...vendor, vendorName: editVendorName, email: editEmail, mobile: editMobile, branchIds: selectedBranchIds }
        : vendor
    );
    setVendors(updatedVendors);
    setEditModalVisible(false);
  };

  // Function to toggle selection of branch
  const toggleBranchSelection = (branchId) => {
    if (selectedBranchIds.includes(branchId)) {
      setSelectedBranchIds(selectedBranchIds.filter(id => id !== branchId));
    } else {
      setSelectedBranchIds([...selectedBranchIds, branchId]);
    }
  };

  // Function to check if branch is selected
  const isBranchSelected = (branchId) => {
    return selectedBranchIds.includes(branchId);
  };

  // Function to get branch name from branchId
  const getBranchName = (branchId) => {
    const branch = branchesData.find(branch => branch.id === branchId);
    return branch ? `${branch.city}, ${branch.country} - ${branch.branchName}` : 'Unknown Branch';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FeatherIcon name="chevron-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Company Vendors</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <FeatherIcon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
       
         style={styles.searchTextInput}
            placeholder="Search By Vendor Name..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            onSubmitEditing={handleSearch}
        />
     </View>
      </View>

      {/* Vendor Cards */}
      <View style={styles.cardContainer}>
        {vendors.map(vendor => (
          <View key={vendor.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>Vendor Name:</Text>
              <Text style={styles.value}>{vendor.vendorName}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{vendor.email}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Mobile:</Text>
              <Text style={styles.value}>{vendor.mobile}</Text>
            </View>

            {/* Displaying branches with access */}
            <View style={styles.row}>
              <Text style={styles.label}>Access to:</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {vendor.branchIds.map(branchId => (
                  <Text key={branchId} style={[styles.value, { marginRight: 8 }]}>
                    {getBranchName(branchId)}
                  </Text>
                ))}
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(vendor)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(vendor)}>
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
          <Text style={styles.modalTitle}>Edit Vendor</Text>
          <ScrollView>
            {/* Vendor Name */}
            <Text style={styles.inputLabel}>Vendor Name:</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Vendor Name"
              value={editVendorName}
              onChangeText={text => setEditVendorName(text)}
            />

            {/* Email */}
            <Text style={styles.inputLabel}>Email:</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Email"
              value={editEmail}
              onChangeText={text => setEditEmail(text)}
            />

            {/* Mobile */}
            <Text style={styles.inputLabel}>Mobile:</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Mobile"
              value={editMobile}
              onChangeText={text => setEditMobile(text)}
            />

            {/* Access to */}
            <Text style={styles.inputLabel}>Access to:</Text>
            {branchesData.map(branch => (
              <View key={branch.id} style={styles.checkboxRow}>
                <CheckBox
                  value={isBranchSelected(branch.id)}
                  onValueChange={() => toggleBranchSelection(branch.id)}
                />
                <Text style={styles.checkboxLabel}>{getBranchName(branch.id)}</Text>
              </View>
            ))}

            {/* Save and Cancel Buttons */}
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
            {selectedVendor && (
        <Text style={styles.confirmText}>
          Are you sure you want to delete {selectedVendor.vendorName}?
        </Text>
      )}
            
            {/* Yes and No Buttons */}
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
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  
 


});

