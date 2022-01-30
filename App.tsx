import AsyncStorageLib from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './components/Home-Page/home-page';
import LoginPage from './components/Login-Page/login-page';

export default function App() {
  const [user, setUser] = useState({
    id: AsyncStorageLib.getItem('id'),
    name: AsyncStorageLib.getItem('fullname'),
    isAuthenticated: AsyncStorageLib.getItem('isAuthenticated'),
    isManager: AsyncStorageLib.getItem('isManager'),
    username: AsyncStorageLib.getItem('username'),
  });

  const Stack = createNativeStackNavigator();

  // if (!user.isAuthenticated) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login-Page'>
        <Stack.Screen
          name='Login-Page'
          component={LoginPage}
          options={{ title: 'Login Here' }}
        />

        <Stack.Screen
          name='Home-Page'
          component={HomePage}
          options={{ title: 'Home Page' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
  // }
}
