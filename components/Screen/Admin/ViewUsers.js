import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const usersData = [
  {
    id: 1,
    userName: 'John Doe',
    email: 'john.doe@example.com',
    mobile: '123-456-7890',
    
  },
  {
    id: 2,
    userName: 'Jane Smith',
    email: 'jane.smith@example.com',
    mobile: '987-654-3210',
   
  },
  // Add more users as needed
];

export default function ViewUsers({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState(usersData);

  // Function to handle search
  const handleSearch = () => {
    const filteredUsers = usersData.filter(user =>
      user.userName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FeatherIcon name="chevron-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Users List</Text>
      </View>

      {/* Search Bar */}
     

      <View style={styles.searchContainer}>
        <View style={styles.searchInput}>
          <FeatherIcon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchTextInput}
            placeholder="Search by Name..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            onSubmitEditing={handleSearch}

          />
        </View>
      </View>
      {/* User Cards */}
      <View style={styles.cardContainer}>
        {users.map(user => (
          <View key={user.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.label}>User Name:</Text>
              <Text style={styles.value}>{user.userName}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Mobile:</Text>
              <Text style={styles.value}>{user.mobile}</Text>
            </View>

          </View>
        ))}
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
});

