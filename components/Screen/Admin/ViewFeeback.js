import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function ViewFeedback({navigation}) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all'); // State to track active filter

  // Dummy data for demonstration
  const initialFeedbackData = [
    { id: 1, type: 'feedback', description: 'This is a feedback item.' },
    { id: 2, type: 'complaint', description: 'This is a complaint item.' },
    { id: 3, type: 'suggestion', description: 'This is a suggestion item.' },
  ];

  useEffect(() => {
    // Simulate fetching feedback from an API
    setFeedbackList(initialFeedbackData);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.feedbackItem}>
      <Text style={styles.feedbackType}>{item.type}</Text>
      <Text style={styles.feedbackDescription}>{item.description}</Text>
    </View>
  );

  const filterFeedback = (type) => {
    if (type === 'all') {
      setFeedbackList(initialFeedbackData);
    } else {
      const filteredList = initialFeedbackData.filter((item) => item.type === type);
      setFeedbackList(filteredList);
    }
    setActiveFilter(type); // Set active filter
  };

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FeatherIcon name="chevron-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Users Messages</Text>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'all' && styles.activeFilterButton]}
          onPress={() => filterFeedback('all')}
        >
          <Text style={[styles.filterButtonText, activeFilter === 'all' && styles.activeFilterButtonText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'feedback' && styles.activeFilterButton]}
          onPress={() => filterFeedback('feedback')}
        >
          <Text style={[styles.filterButtonText, activeFilter === 'feedback' && styles.activeFilterButtonText]}>Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'complaint' && styles.activeFilterButton]}
          onPress={() => filterFeedback('complaint')}
        >
          <Text style={[styles.filterButtonText, activeFilter === 'complaint' && styles.activeFilterButtonText]}>Complaint</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, activeFilter === 'suggestion' && styles.activeFilterButton]}
          onPress={() => filterFeedback('suggestion')}
        >
          <Text style={[styles.filterButtonText, activeFilter === 'suggestion' && styles.activeFilterButtonText]}>Suggestion</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={feedbackList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 10 }}
      />
    </SafeAreaView>
  );
};

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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(204, 204, 204, 1.00)', // Default border color
    backgroundColor: '#fff', // Default background color
  },
  activeFilterButton: {
    backgroundColor: '#007bff', // Active background color
  },
  activeFilterButtonText: {
    color: '#fff', // Active text color
  },
  filterButtonText: {
    // color: '#007bff', // Default text color
    // fontWeight: 'bold',
  },
  feedbackItem: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  feedbackType: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  feedbackDescription: {},
});
