
import { Tabs } from 'expo-router';
import React from 'react';
 
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
 
export default function TabLayout() {
  const colorScheme = useColorScheme();
 
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: { display: 'none' }, // Hide the tab bar
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: '',
        }}
      />
    </Tabs>
  );
}
 