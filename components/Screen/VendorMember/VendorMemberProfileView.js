import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function VendorMemberProfileView({ navigation }) {
  const form = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    mobile: '123-456-7890',
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FeatherIcon name="chevron-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Profile</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Name</Text>
            <Text style={styles.detailText}>{form.name}</Text>
          </View>


          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailText}>{form.email}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Mobile Number</Text>
            <Text style={styles.detailText}>{form.mobile}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
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
  detailsContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  detailItem: {
    marginBottom: 24,
  },
  detailLabel: {
    marginBottom: 8,
    fontSize: 17,
    fontWeight: '500',
    color: '#414d63',
  },
  detailText: {
 
    marginTop: 3,
    fontSize: 16,
    color: '#989898',
   
  },
});
