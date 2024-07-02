import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Picker } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function AddMembers({ navigation }) {
  const [form, setForm] = useState({
    MemberName: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    locations: [
      { name: 'Pune', selected: false },
      { name: 'Mumbai', selected: false },
      { name: 'Sangli', selected: false },
    ],
    selectedLocation: ''
  });

  const handleLocationChange = (itemValue) => {
    setForm({ ...form, selectedLocation: itemValue });
  };

  const handleSubmit = () => {
    const selectedLocations = form.locations.filter(loc => loc.selected).map(loc => loc.name);
    const formData = { ...form, selectedLocations };
    console.log('Registering vendor with:', formData);
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
          <Text style={styles.inputLabel}>Location</Text>
          <Picker
            selectedValue={form.selectedLocation}
            style={styles.picker}
            onValueChange={handleLocationChange}
          >
            <Picker.Item label="Select location..." value="" />
            {form.locations.map((location) => (
              <Picker.Item key={location.name} label={location.name} value={location.name} />
            ))}
          </Picker>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Member Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Member Name"
            value={form.MemberName}
            onChangeText={(MemberName) => setForm({ ...form, MemberName })}
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
          />
        </View>

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
  picker: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
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
