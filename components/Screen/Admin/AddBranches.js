import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function AddBranches({ navigation }) {
  const [form, setForm] = useState({
    country: '',
    city: '',
    branch: '',
  });

  const handleChangeCountry = (country) => {
    setForm({ ...form, country });
  };

  const handleChangeCity = (city) => {
    setForm({ ...form, city });
  };

  const handleChangeBranch = (branch) => {
    setForm({ ...form, branch });
  };

  const handleSubmit = () => {
    // Simulate API call to update user details
    console.log('Updating details with:', form);
    // Replace with actual logic to save changes

    // Navigate back to previous screen after submission
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FeatherIcon name="chevron-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Company Branches</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Country</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Country"
            value={form.country}
            onChangeText={handleChangeCountry}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>City</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter City"
            value={form.city}
            onChangeText={handleChangeCity}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Branch</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Branch"
            value={form.branch}
            onChangeText={handleChangeBranch}
          />
        </View>
      </View>

      {/* Update Details Button */}
      <TouchableOpacity style={styles.updateButton} onPress={handleSubmit}>
        <Text style={styles.updateButtonText}>Add Branch</Text>
      </TouchableOpacity>
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
  updateButton: {
    marginHorizontal: 24,
    marginTop: 24,
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
