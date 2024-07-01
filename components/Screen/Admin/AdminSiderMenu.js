import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Switch,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function AdminSiderMenu() {
    const navigation = useNavigation();
  const [form, setForm] = useState({
    darkMode: false,
    emailNotifications: true,
    pushNotifications: false,
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <View style={styles.profileAvatarWrapper}>
              <Image
                alt=""
                source={{
                  uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                }}
                style={styles.profileAvatar} />

              <TouchableOpacity
              onPress={() => navigation.navigate('EditAdminProfile')}
>
                <View style={styles.profileAction}>
                  <FeatherIcon
                    color="#fff"
                    name="edit-3"
                    size={15} />
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View>
            <Text style={styles.profileName}>John Doe</Text>

            <Text style={styles.profileAddress}>
              123 Maple Street. Anytown, PA 17101
            </Text>
          </View>
        </View>

        <ScrollView>
  <View style={styles.section}>
    {/* Home */}
    <TouchableOpacity
      onPress={() => navigation.navigate('AdminHome')}
      style={styles.row}>
      <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
        <FeatherIcon color="#fff" name="home" size={20} />
      </View>
      <Text style={styles.rowLabel}>Home</Text>
      <View style={styles.rowSpacer} />
      <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
    </TouchableOpacity>

    {/* Your Profile */}
    <TouchableOpacity
      onPress={() => navigation.navigate('AdminProfileView')}
      style={styles.row}>
      <View style={[styles.rowIcon, { backgroundColor: '#32c759' }]}>
        <FeatherIcon color="#fff" name="user" size={20} />
      </View>
      <Text style={styles.rowLabel}>Your Profile</Text>
      <View style={styles.rowSpacer} />
      <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
    </TouchableOpacity>

    {/* Add Branches */}
    <TouchableOpacity
      onPress={() => {
        // handle onPress
      }}
      style={styles.row}>
      <View style={[styles.rowIcon, { backgroundColor: 'tomato' }]}>
        <FeatherIcon color="#fff" name="plus" size={20} />
      </View>
      <Text style={styles.rowLabel}>Add Branches</Text>
      <View style={styles.rowSpacer} />
      <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
    </TouchableOpacity>

    {/* Add Vendor */}
    <TouchableOpacity
      onPress={() => {
        // handle onPress
      }}
      style={styles.row}>
      <View style={[styles.rowIcon, { backgroundColor: '#fe9400' }]}>
        <FeatherIcon color="#fff" name="plus" size={20} />
      </View>
      <Text style={styles.rowLabel}>Add Vendor</Text>
      <View style={styles.rowSpacer} />
      <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
    </TouchableOpacity>

    {/* View Vendor */}
    <TouchableOpacity
      onPress={() => {
        // handle onPress
      }}
      style={styles.row}>
      <View style={[styles.rowIcon, { backgroundColor: '#8e8d91' }]}>
        <FeatherIcon color="#fff" name="eye" size={20} />
      </View>
      <Text style={styles.rowLabel}>View Vendor</Text>
      <View style={styles.rowSpacer} />
      <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
    </TouchableOpacity>

    {/* View Users */}
    <TouchableOpacity
      onPress={() => {
        // handle onPress
      }}
      style={styles.row}>
      <View style={[styles.rowIcon, { backgroundColor: '#5a9bd4' }]}>
        <FeatherIcon color="#fff" name="users" size={20} />
      </View>
      <Text style={styles.rowLabel}>View Users</Text>
      <View style={styles.rowSpacer} />
      <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
    </TouchableOpacity>

    {/* Check Messages */}
    <TouchableOpacity
      onPress={() => {
        // handle onPress
      }}
      style={styles.row}>
      <View style={[styles.rowIcon, { backgroundColor: '#00bcd4' }]}>
        <FeatherIcon color="#fff" name="message-circle" size={20} />
      </View>
      <Text style={styles.rowLabel}>Check Messages</Text>
      <View style={styles.rowSpacer} />
      <FeatherIcon color="#C6C6C6" name="chevron-right" size={20} />
    </TouchableOpacity>
  </View>
</ScrollView>


      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Profile */
  profile: {
    padding: 24,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    position: 'relative',
  },
  profileAvatar: {
    width: 72,
    height: 72,
    borderRadius: 9999,
  },
  profileAction: {
    position: 'absolute',
    right: -4,
    bottom: -10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 9999,
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: '600',
    color: '#414d63',
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: 5,
    fontSize: 16,
    color: '#989898',
    textAlign: 'center',
  },
  /** Section */
  section: {
    paddingHorizontal: 24,
  },
  /** Row */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: '400',
    color: '#0c0c0c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
