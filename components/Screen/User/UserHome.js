import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image, ScrollView, Modal, Pressable } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
 
const Card = ({ image, name, type, isVeg, price, availability, vendor, location }) => {
  let statusBackgroundColor = '#57AF46'; // Default color for available items
 
  if (availability === 'finished') {
    statusBackgroundColor = 'red'; // Change to red for finished items
  }
 
  return (
    <View style={styles.foodCard}>
      <Image source={image} style={styles.foodImage} resizeMode="cover" />
     
      {/* Price Badge */}
      <View style={styles.priceBadge}>
        <Text style={styles.priceText}>₹{price}</Text>
      </View>
 
      {/* Status Badge */}
      <View style={[styles.statusBadge, { backgroundColor: statusBackgroundColor }]}>
        <Text style={styles.statusText}>{availability === 'available' ? 'Available' : 'Finished'}</Text>
      </View>
 
      <View style={styles.foodBottom}>
        <View style={styles.foodLeft}>
          <Text style={styles.foodName}>{name}</Text>
          {isVeg ? (
            <FeatherIcon name="circle" size={16} color="white" style={styles.vegIcon} />
          ) : (
            <FeatherIcon name="circle" size={16} color="white" style={styles.nonVegIcon} />
          )}
        </View>
        <View style={styles.vendorInfo}>
          <Text style={styles.vendorName}>{vendor}</Text>
          <Text style={styles.vendorLocation}>{location}</Text>
        </View>
      </View>
    </View>
  );
};
 
export default function UserHome() {
  const navigation = useNavigation();
  const [selectedLocation, setSelectedLocation] = useState('City A');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [modalVisible, setModalVisible] = useState(false); // State for controlling modal visibility
  const [foodItems, setFoodItems] = useState([
    {
      id: 1,
      name: 'Pasta',
      type: 'lunch',
      isVeg: true,
      price: '120',
      image: require('../../../assets/images/pasta.jpg'),
      availability: 'available',
      vendor: 'ABC Restaurant',
      location: 'City A',
    },
    {
      id: 2,
      name: 'Salad',
      type: 'lunch',
      isVeg: true,
      price: '60',
      image: require('../../../assets/images/salad.jpg'),
      availability: 'finished',
      vendor: 'XYZ Cafe',
      location: 'City B',
    },
    {
      id: 3,
      name: 'Sandwich',
      type: 'breakfast',
      isVeg: true,
      price: '50',
      image: require('../../../assets/images/sandwich.jpg'),
      availability: 'available',
      vendor: 'DEF Eatery',
      location: 'City C',
    },
    {
      id: 4,
      name: 'Pizza',
      type: 'snack',
      isVeg: false,
      price: '100',
      image: require('../../../assets/images/pizza.jpg'),
      availability: 'available',
      vendor: 'GHI Pizzeria',
      location: 'City D',
    },
    {
      id: 5,
      name: 'Veg Thali',
      type: 'dinner',
      isVeg: true,
      price: '150',
      image: require('../../../assets/images/vegthali.jpg'),
      availability: 'available',
      vendor: 'JKL Diner',
      location: 'City E',
    },
    {
      id: 6,
      name: 'Pepsi',
      type: 'all day',
      isVeg: true,
      price: '20',
      image: require('../../../assets/images/pepsi.jpg'),
      availability: 'available',
      vendor: 'MNO Refreshments',
      location: 'City F',
    },
  ]);
 
  const renderFoodItem = ({ item }) => (
    <Card
      image={item.image}
      name={item.name}
      type={item.type}
      isVeg={item.isVeg}
      price={item.price}
      availability={item.availability}
      vendor={item.vendor}
      location={item.location}
    />
  );
 
  const openModal = () => {
    setModalVisible(true);
  };
 
  const closeModal = () => {
    setModalVisible(false);
  };
 
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openModal}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>{selectedLocation}</Text>
            <FeatherIcon name="chevron-down" size={20} color="#007bff" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserSiderMenu')}>
          <View style={styles.userCircle}>
            <Text style={styles.userInitials}>JD</Text>
          </View>
        </TouchableOpacity>
      </View>
 
      {/* Search Box */}
      <View style={styles.searchBoxContainer}>
        <FeatherIcon name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchBox}
          placeholder="Search Food Items"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
 
      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
        <View style={styles.filters}>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'all' && styles.selectedFilter]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text style={[styles.filterText, selectedFilter === 'all' && styles.selectedFilterText]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'breakfast' && styles.selectedFilter]}
            onPress={() => setSelectedFilter('breakfast')}
          >
            <Text style={[styles.filterText, selectedFilter === 'breakfast' && styles.selectedFilterText]}>Breakfast</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'lunch' && styles.selectedFilter]}
            onPress={() => setSelectedFilter('lunch')}
          >
            <Text style={[styles.filterText, selectedFilter === 'lunch' && styles.selectedFilterText]}>Lunch</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'snack' && styles.selectedFilter]}
            onPress={() => setSelectedFilter('snack')}
          >
            <Text style={[styles.filterText, selectedFilter === 'snack' && styles.selectedFilterText]}>Snack</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'all day' && styles.selectedFilter]}
            onPress={() => setSelectedFilter('all day')}
          >
            <Text style={[styles.filterText, selectedFilter === 'all day' && styles.selectedFilterText]}>All Day</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'dinner' && styles.selectedFilter]}
            onPress={() => setSelectedFilter('dinner')}
          >
            <Text style={[styles.filterText, selectedFilter === 'dinner' && styles.selectedFilterText]}>Dinner</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
 
      {/* Food Items List */}
      {foodItems.length > 0 ? (
        <FlatList
          data={foodItems.filter(item => selectedFilter === 'all' || item.type === selectedFilter)}
          renderItem={renderFoodItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.foodList}
        />
      ) : (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>No items found</Text>
        </View>
      )}
 
      {/* Location Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select Location</Text>
            {/* Replace ScrollView with Picker */}
            <Picker
  selectedValue={selectedLocation}
  onValueChange={(itemValue, itemIndex) => setSelectedLocation(itemValue)}
  style={styles.modalPicker}
>
  {foodItems.map((item) => (
    <Picker.Item
      key={item.location}
      label={item.location}
      value={item.location}
    />
  ))}
</Picker>


            {/* Buttons */}
            <View style={styles.modalButtonContainer}>
              {/* Done Button */}
              <TouchableOpacity
                style={[styles.modalButton, styles.modalDoneButton]}
                onPress={closeModal}
              >
                <Text style={styles.textStyle}>Done</Text>
              </TouchableOpacity>
              {/* Close Button */}
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCloseButton]}
                onPress={closeModal}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#d3d3d3', 
  },
  locationText: {
    fontSize: 16,
    marginRight: 8,
  },
  userCircle: {
    backgroundColor: '#007bff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInitials: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#d3d3d3', 
  },  
  searchIcon: {
    marginRight: 8,
  },
  searchBox: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterScroll: {
    marginBottom: 16,
  },
  filters: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    marginHorizontal: 3,
    backgroundColor: '#fff', // Default background color
  },
  filterText: {
    fontSize: 14,
    color: '#000', // Default text color
  },
  selectedFilter: {
    backgroundColor: '#007bff', // Selected background color
  },
  selectedFilterText: {
    color: '#fff', // Selected text color
    fontSize: 14,
    fontWeight: 'bold',
  },
  foodList: {
    marginBottom: 16,
  },
  foodCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginLeft: 8,
    marginRight: 8,
  },
  foodImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  priceBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    elevation: 3,
    zIndex: 1,
  },
  priceText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    elevation: 3,
    zIndex: 1,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  foodBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  foodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  vegIcon: {
    marginRight: 4,
    backgroundColor:'#57AF46',
    borderWidth:1,
    borderColor:'white',
    padding:1,
    borderRadius:5,

  },
  nonVegIcon: {
    marginRight: 4,
    backgroundColor:'red',
    borderWidth:1,
    borderColor:'white',
    padding:1,
    borderRadius:5,
  },
  vendorInfo: {
    alignItems: 'flex-end',
  },
  vendorName: {
    fontSize: 14,
    color: '#666',
  },
  vendorLocation: {
    fontSize: 12,
    color: '#999',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
    width: '80%', // Adjust width as needed
    paddingBottom: 30, // Increase bottom padding for more space
  },
  
  

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },


  modalPicker: {
    height: 200, // Adjust height as needed
    width: '100%',
    marginTop: -20,
  },
  



  
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalButton: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: '40%',
  },
  modalDoneButton: {
    backgroundColor: '#007bff',
  },
  modalCloseButton: {
    backgroundColor: 'tomato',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  noItemsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
 
 

 