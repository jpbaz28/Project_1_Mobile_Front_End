import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { backendAddress } from '../../dtos/backend-address';
import { Employee, Reimbursement, User } from '../../dtos/dtos';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function LoginPage(props: { updateUser: Function; navigation }) {
  const [nameInput, setNameInput] = useState<string>('');
  const [passInput, setPassInput] = useState<string>('');

  async function login() {
    try {
      const response = await axios.patch(`${backendAddress}/login`, {
        username: nameInput,
        password: passInput,
      });
      const employee: Employee = response.data;
      props.updateUser({
        id: employee.id,
        username: employee.username,
        name: `${employee.fname} ${employee.lname}`,
        isManager: employee.isManager,
        isAuthenticated: true,
        reimburseAccount: employee.reimburseAccount,
      });

      await AsyncStorage.setItem('id', employee.id);
      await AsyncStorage.setItem(
        'fullname',
        `${employee.fname} ${employee.lname}`
      );
      await AsyncStorage.setItem('isAuthenticated', 'true');
      await AsyncStorage.setItem('username', employee.username);
      if (employee.isManager) {
        await AsyncStorage.setItem('isManager', 'true');
        props.navigation.navigate('Manager');
      } else {
        props.navigation.navigate('Employee');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <TextInput
        style={styles.input}
        placeholder='username'
        onChangeText={setNameInput}
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder='password'
        textContentType='password'
        onChangeText={setPassInput}
        secureTextEntry={true}
        autoCapitalize='none'
      />
      <Button
        onPress={login}
        title='Login'
        color='#841584'
        accessibilityLabel='Login Here'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
