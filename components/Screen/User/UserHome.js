import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const Card = ({ image, name, type, isVeg, price, availability, vendor, location }) => (
  <View style={styles.foodCard}>
    <Image source={image} style={styles.foodImage} resizeMode="cover" />
    
    {availability === 'available' && (
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>Available</Text>
      </View>
    )}
    {availability === 'finished' && (
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>Finished</Text>
      </View>
    )}

    <View style={styles.foodBottom}>
      <View style={styles.foodLeft}>
        <Text style={styles.foodName}>{name}</Text>
        {isVeg ? (
          <FeatherIcon name="check-circle" size={16} color="green" style={styles.vegIcon} />
        ) : (
          <FeatherIcon name="slash" size={16} color="red" style={styles.nonVegIcon} />
        )}
       
      </View>
      <View style={styles.vendorInfo}>
        <Text style={styles.vendorName}>{vendor}</Text>
        <Text style={styles.vendorLocation}>{location}</Text>
      </View>
    </View>
  </View>
);

export default function UserHome() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
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

  return (
    <View style={styles.container}>
      {/* Greetings and User Circle */}
      <TouchableOpacity onPress={() => navigation.navigate('UserSiderMenu')}>
        <View style={styles.header}>
          <Text style={styles.greetings}>Good Morning</Text>
          <View style={styles.userCircle}>
            <Text style={styles.userInitials}>JD</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Search Box */}
      <TextInput
        style={styles.searchBox}
        placeholder="Search food items"
        placeholderTextColor="#000"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

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
      <FlatList
        data={foodItems.filter(item => selectedFilter === 'all' || item.type === selectedFilter)}
        renderItem={renderFoodItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.foodList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greetings: {
    fontSize: 18,
    fontWeight: '600',
  },
  userCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInitials: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  searchBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#000',
  },
  filterScroll: {
    marginBottom: 16,
  },
  filters: {
    flexDirection: 'row',
    height: 40,
  },
  filterButton: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
  },
  selectedFilter: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  filterText: {
    fontSize: 16,
    color: '#333',
  },
  selectedFilterText: {
    color: '#fff',
  },
  foodList: {
    flex: 1,
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
  cardContent: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  foodImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
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
  },
  nonVegIcon: {
    marginRight: 4,
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
});
