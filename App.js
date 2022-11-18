import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';

import Welcome from './components/Login_Logout/Welcome.js';
import SignUp from './components/Login_Logout/SignUp.js';
import SignIn from './components/Login_Logout/SignIn.js';
import ResetPassword from './components/Login_Logout/ResetPassword.js';
import OnBoard from './components/Login_Logout/OnBoard.js';

import HomeScreen from './components/Main_Screen/HomeScreen.js';
import MapScreen from './components/Main_Screen/MapScreen.js';
import QRScan from './components/Main_Screen/QRScan.js';
import TourDetailScreen from './components/Main_Screen/TourDetailScreen.js';
import HotelBooking from './components/Main_Screen/HotelBooking.js';
import HotelBookingDetails from './components/Main_Screen/HotelBookingDetails.js';

const HomeScreenStack = createNativeStackNavigator();
const HomeScreenComponent = () => (
  <HomeScreenStack.Navigator initialRouteName='HomeScreenStack' screenOptions={{
    headerShown: false
  }}>
    <HomeScreenStack.Screen 
      name = "HomeScreen"
      component = {HomeScreen}
    />
    <HomeScreenStack.Screen 
      name = "TourDetailScreen"
      component = {TourDetailScreen}
    />
    <HomeScreenStack.Screen 
      name = "HotelBooking"
      component = {HotelBooking}
    />
    <HomeScreenStack.Screen 
      name = "HotelBookingDetails"
      component = {HotelBookingDetails}
    />
  </HomeScreenStack.Navigator>
)

const MainScreenTab = createBottomTabNavigator();
const MainScreenComponent = () => (
  <MainScreenTab.Navigator initialRouteName='MainScreenTab' screenOptions={{
    headerShown: false,
    tabBarStyle: {
      backgroundColor: 'white'
    },
    tabBarInactiveTintColor: '#007a88',
    tabBarActiveTintColor: '#fb6d79'
  }}>
    <MainScreenTab.Screen
      name="Trang chủ"
      component={HomeScreenComponent}
      options = {{
      tabBarIcon: ({color, size}) =>
        <Ionicons name='home-outline' color = {color} size = {size}/>
      }}
    />
    <MainScreenTab.Screen
      name = "Bản đồ"
      component = {MapScreen}
      options = {{
      tabBarIcon: ({color, size}) =>
        <Ionicons name='map-outline' color = {color} size = {size}/>
      }}
    />
    <MainScreenTab.Screen
      name = "QR Code"
      component = {QRScan}
      options = {{
      tabBarIcon: ({color, size}) =>
        <Ionicons name='qr-code-outline' color = {color} size = {size}/>
      }}
    />
  </MainScreenTab.Navigator>
)

const WelcomeStack = createNativeStackNavigator();
export default function App() {
  const [fontsLoaded] = useFonts({
    stantic: require('./assets/fonts/Stantic.ttf'),
    museo100: require('./assets/fonts/MuseoSans-100.otf'),
    museo300: require('./assets/fonts/MuseoSans-300.otf'),
    museo500: require('./assets/fonts/MuseoSans_500.otf'),
    museo700: require('./assets/fonts/MuseoSans_700.otf'),
    SourceSansPro_Regular: require('./assets/fonts/SourceSansPro-Regular.ttf'),
    SourceSansPro_Italic: require('./assets/fonts/SourceSansPro-Italic.ttf'),
    SourceSansPro_Bold: require('./assets/fonts/SourceSansPro-Bold.ttf'),
    SourceSansPro_Black: require('./assets/fonts/SourceSansPro-Black.ttf'),
    SourceSansPro_Light: require('./assets/fonts/SourceSansPro-Light.ttf'),
    SourceSansPro_ExtraLight: require('./assets/fonts/SourceSansPro-ExtraLight.ttf'),
  });

  if(!fontsLoaded) return null;

  return (
    <NavigationContainer>
        <StatusBar barStyle = "dark-content" hidden = {false} translucent = {true}/>
        <WelcomeStack.Navigator initialRouteName='WelcomeStack' screenOptions={{
            headerShown: false
          }}>
          <WelcomeStack.Screen
            name = "Welcome"
            component = {Welcome}
          />
          <WelcomeStack.Screen
            name = "OnBoard"
            component = {OnBoard}
          />
          <WelcomeStack.Screen
            name = "SignUp"
            component = {SignUp}
          />
          <WelcomeStack.Screen
            name = "SignIn"
            component = {SignIn}
          />
          <WelcomeStack.Screen
            name = "ResetPassword"
            component = {ResetPassword}
          />
          <WelcomeStack.Screen
            name = "MainScreen"
            component = {MainScreenComponent}
          />
        </WelcomeStack.Navigator>
    </NavigationContainer>
  );
}