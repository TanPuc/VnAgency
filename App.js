import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';

import Welcome from './components/Login_Logout/Welcome.js';
import SignUp from './components/Login_Logout/SignUp.js';
import SignIn from './components/Login_Logout/SignIn.js';
import ResetPassword from './components/Login_Logout/ResetPassword.js';
import Home from './components/Home_Screen/Home.js';

const Stack = createNativeStackNavigator();

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
        <Stack.Navigator screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen
            name = "Welcome"
            component = {Welcome}
          />
          <Stack.Screen
            name = "SignUp"
            component = {SignUp}
          />
          <Stack.Screen
            name = "SignIn"
            component = {SignIn}
          />
          <Stack.Screen
            name = "ResetPassword"
            component = {ResetPassword}
          />
          <Stack.Screen
            name = "Home"
            component = {Home}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
}