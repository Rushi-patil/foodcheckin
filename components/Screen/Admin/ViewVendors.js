import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Alert, CheckBox } from 'react-native';
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
        <TextInput
          style={styles.input}
          placeholder="Search By Vendor Name..."
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          onSubmitEditing={handleSearch}
        />
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
            <Text>Edit Vendor</Text>
            
            {/* Form for editing vendor */}
            <TextInput
              style={styles.input}
              placeholder="Vendor Name"
              value={editVendorName}
              onChangeText={text => setEditVendorName(text)}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={editEmail}
              onChangeText={text => setEditEmail(text)}
            />
            
            <TextInput
              style={styles.input}
              placeholder="Mobile"
              value={editMobile}
              onChangeText={text => setEditMobile(text)}
            />
            
            {/* Checkboxes for branches */}
            <View style={styles.checkboxContainer}>
              {branchesData.map(branch => (
                <View key={branch.id} style={styles.checkboxRow}>
                  <CheckBox
                    value={isBranchSelected(branch.id)}
                    onValueChange={() => toggleBranchSelection(branch.id)}
                  />
                  <Text style={styles.checkboxLabel}>{`${branch.city}, ${branch.country} - ${branch.branchName}`}</Text>
                </View>
              ))}
            </View>

            {/* Buttons */}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#3498db' }]} onPress={handleConfirmEdit}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#e74c3c' }]} onPress={() => setEditModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
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
            <Text>Confirm Delete</Text>
            {selectedVendor && (
              <Text>Are you sure you want to delete {selectedVendor.vendorName}?</Text>
            )}
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#e74c3c' }]} onPress={handleConfirmDelete}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#3498db' }]} onPress={() => setDeleteModalVisible(false)}>
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
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
  },
  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  checkboxContainer: {
    marginTop: 16,
    width: '100%',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
});

