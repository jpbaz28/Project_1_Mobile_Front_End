import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

export default function LoginPage(props: { updateUser: Function }) {
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  let removeMe = 0;

  return (
    <View style={styles.container}>
      <Text>Fuck You!</Text>
      <TextInput
        style={styles.input}
        placeholder='useless placeholder'
        ref={usernameInput}
      />
      <TextInput
        style={styles.input}
        placeholder='useless placeholder'
        keyboardType='numeric'
        ref={passwordInput}
      />
      <Button
        onPress={() => {
          removeMe + 1;
        }}
        title='Learn More'
        color='#841584'
        accessibilityLabel='Learn more about this purple button'
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
