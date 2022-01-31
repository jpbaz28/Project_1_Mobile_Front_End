import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './components/Home-Page/home-page';
import LoginPage from './components/Login-Page/login-page';

export default function App() {
  let storedId = '';
  let storedName = '';
  let storedAuth = '';
  let storedIsMan = '';
  let storedUsername = '';
  async function getData() {
    storedId = await AsyncStorage.getItem('id');
    storedName = await AsyncStorage.getItem('fullname');
    storedAuth = await AsyncStorage.getItem('isAuthenticated');
    storedIsMan = await AsyncStorage.getItem('isManager');
    storedUsername = await AsyncStorage.getItem('username');
  }

  getData();

  const [user, setUser] = useState({
    id: storedId,
    name: storedName,
    isAuthenticated: storedAuth,
    isManager: storedIsMan,
    username: storedUsername,
  });

  const Stack = createNativeStackNavigator();

  if (!user.isAuthenticated) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login-Page'>
          <Stack.Screen name='Login-Page'>
            {(props) => <LoginPage {...props} updateUser={setUser} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home-Page'>
          <Stack.Screen name='Employee'>
            {(props) => (
              <HomePage {...props} employee={user} updateEmployee={setUser} />
            )}
          </Stack.Screen>
          <Stack.Screen name='Manager'>
            {(props) => (
              <HomePage {...props} employee={user} updateEmployee={setUser} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
