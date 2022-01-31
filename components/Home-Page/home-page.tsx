import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import { User } from '../../dtos/dtos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReimbursementSubmit from '../Reimbursement-Submit/reimbursement-submit';
import ReimbursementViewer from '../Reimbursement-Viewer/reimbursement-viewer';

export default function HomePage(props: {
  employee: User;
  updateEmployee: Function;
  navigation;
}) {
  function logout() {
    AsyncStorage.clear();
    props.navigation.navigate('Login-Page');
  }

  if (props.employee.isManager) {
    return (
      <>
        <View style={styles.container}>
          <Text>Manager Home Page</Text>
          <Text>Welcome {props.employee.name}!</Text>
          <ReimbursementViewer />
          <Button
            onPress={logout}
            title='Logout'
            color='#841584'
            accessibilityLabel='Logout'
          />
        </View>
      </>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Employee Home Page</Text>
        <Text>Welcome {props.employee.name}!</Text>
        <ReimbursementSubmit employee={props.employee} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
