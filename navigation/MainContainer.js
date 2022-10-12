import * as React from 'react';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet } from 'react-native';

// Screens
import HomeScreen from './screens/HomeScreen.js';
import MapScreen from './screens/MapScreen.js';

//Screen names
const homeName = "Home";
const mapName = "Map";

const Tab = createBottomTabNavigator();

function BottomNavBar() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown:false,
          tabBarStyle: {
            borderTopLeftRadius:25, 
            borderTopRightRadius:25,
            backgroundColor:'#00c0b2'
          },
          tabBarInactiveTintColor: '#007a88',
          tabBarActiveTintColor: '#fb6d79'
        }}
        >
        <Tab.Screen 
          name={homeName}
          component={HomeScreen}
          options={{
          tabBarIcon: ({color, size}) =>
            <Ionicons name='home-outline' color = {color} size = {size}/>
          }}
            />
        <Tab.Screen 
          name={mapName} 
          component={MapScreen} 
          options={{
          tabBarIcon: ({color, size}) =>
            <Ionicons name='map-outline' color = {color} size = {size}/>
          }}
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

function MainContainer() {
  return (
    // Header(),
    BottomNavBar()
  );
}

export default MainContainer;