import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import CheckBox from 'react-native-check-box';

// Dummy data for locations
const initialLocations = [
  { id: 1, name: 'Pune' },
  { id: 2, name: 'Mumbai' },
  { id: 3, name: 'Sangli' },
  { id: 4, name: 'Nagpur' },
  { id: 5, name: 'Goa' },
  // Add more locations as needed
];

export default function VendorRegistration({ navigation }) {
  const [form, setForm] = useState({
    vendorName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    locations: initialLocations.map(loc => ({ ...loc, selected: false })),
  });

  const [filteredLocations, setFilteredLocations] = useState(initialLocations);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Filter locations based on search query
    const filtered = initialLocations.filter(loc =>
      loc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLocations(filtered);
  }, [searchQuery]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleLocationChange = (id) => {
    const updatedLocations = form.locations.map(loc =>
      loc.id === id ? { ...loc, selected: !loc.selected } : loc
    );
    setForm({ ...form, locations: updatedLocations });
  };

  const handleSubmit = () => {
    // Validate form fields (e.g., check if passwords match, validate email format)

    // Include selected locations in the data being sent
    const selectedLocations = form.locations.filter(loc => loc.selected).map(loc => loc.name);
    const formData = {
      ...form,
      selectedLocations,
    };

    // Simulate API call to register vendor
    console.log('Registering vendor with:', formData);
    // Replace with actual logic to register vendor

    // Navigate to another screen after successful registration
    navigation.navigate('Home'); // Replace 'Home' with appropriate screen name
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FeatherIcon name="chevron-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vendor Registration</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Vendor Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Vendor Name"
            placeholderTextColor="#999"
            value={form.vendorName}
            onChangeText={(vendorName) => setForm({ ...form, vendorName })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            placeholderTextColor="#999"
            value={form.email}
            onChangeText={(email) => setForm({ ...form, email })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Mobile Number"
            placeholderTextColor="#999"
            value={form.mobileNumber}
            onChangeText={(mobileNumber) => setForm({ ...form, mobileNumber })}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            placeholderTextColor="#999"
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            value={form.confirmPassword}
            onChangeText={(confirmPassword) => setForm({ ...form, confirmPassword })}
            secureTextEntry
          />
        </View>

        {/* Location Selection */}
        <TouchableOpacity style={styles.dropdownButton} onPress={toggleModal}>
          <Text style={styles.dropdownButtonText}>Select Locations</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.searchContainer}>
                <FeatherIcon name="search" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search Locations"
                  placeholderTextColor="#999"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
              {filteredLocations.map(location => (
                <View key={location.id} style={styles.checkboxContainer}>
                  <CheckBox
                    isChecked={form.locations.find(loc => loc.id === location.id)?.selected || false}
                    onClick={() => handleLocationChange(location.id)}
                    checkBoxColor="#007bff"
                  />
                  <Text style={styles.checkboxLabel}>{location.name}</Text>
                </View>
              ))}
         <TouchableOpacity style={styles.modalCloseButton} onPress={toggleModal}>
  <Text style={styles.modalCloseButtonText}>Close</Text>
</TouchableOpacity>

            </View>
          </View>
        </Modal>

        {/* Register Button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
          <Text style={styles.registerButtonText}>Create Vendor</Text>
        </TouchableOpacity>
      </View>
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
  formContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: 16,
    color: '#333', // Default text color
  },
  dropdownButton: {
    backgroundColor: 'grey',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  dropdownButtonText: {
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
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },

  modalCloseButton: {
    marginTop: 24,
    backgroundColor: 'tomato',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  registerButton: {
    marginHorizontal: 24,
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
