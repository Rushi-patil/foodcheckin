import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal, Pressable } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Picker } from '@react-native-picker/picker';

export default function AddMembers({ navigation }) {
  const [form, setForm] = useState({
    MemberName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    locations: [
      { label: 'Pune', value: 'pune' },
      { label: 'Mumbai', value: 'mumbai' },
      { label: 'Sangli', value: 'sangli' },
    ],
    selectedLocation: '',
    isModalVisible: false,
  });

  const handleLocationChange = (itemValue) => {
    setForm({ ...form, selectedLocation: itemValue });
  };

  const toggleModal = () => {
    setForm({ ...form, isModalVisible: !form.isModalVisible });
  };

  const handleSubmit = () => {
    console.log('Form data:', form);
    // Additional logic for form submission
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FeatherIcon name="chevron-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Member Registration</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Select Branch</Text>
          <TouchableOpacity style={styles.selectLocationButton} onPress={toggleModal}>
            <Text>{form.selectedLocation ? form.selectedLocation : 'Select location...'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Member Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Member Name"
            value={form.MemberName}
            onChangeText={(MemberName) => setForm({ ...form, MemberName })}
                placeholderTextColor="#6b7280"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            value={form.email}
            onChangeText={(email) => setForm({ ...form, email })}
            keyboardType="email-address"
            autoCapitalize="none"
                placeholderTextColor="#6b7280"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Mobile Number"
            value={form.mobileNumber}
            onChangeText={(mobileNumber) => setForm({ ...form, mobileNumber })}
            keyboardType="phone-pad"
                placeholderTextColor="#6b7280"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
            secureTextEntry
                placeholderTextColor="#6b7280"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChangeText={(confirmPassword) => setForm({ ...form, confirmPassword })}
            secureTextEntry
                placeholderTextColor="#6b7280"
          />
        </View>

        {/* Modal for Location Selection */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={form.isModalVisible}
          onRequestClose={toggleModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Branch</Text>
              <Picker
                selectedValue={form.selectedLocation}
                style={styles.picker}
                onValueChange={handleLocationChange}
              >
                <Picker.Item label="Select location..." value="" />
                {form.locations.map((location) => (
                  <Picker.Item key={location.value} label={location.label} value={location.value} />
                ))}
              </Picker>
              <Pressable style={styles.closeButton} onPress={toggleModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
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
  },
  selectLocationButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  picker: {
   
    height: 200, // Adjust height as needed
    width: '100%',
    marginTop: -20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
    width: '80%', // Adjust width as needed
    paddingBottom: 30, // Increase bottom padding for more space
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: 'tomato',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
