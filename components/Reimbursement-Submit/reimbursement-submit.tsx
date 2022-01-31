import axios from 'axios';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, Button } from 'react-native';
import { backendAddress } from '../../dtos/backend-address';
import { Employee, User } from '../../dtos/dtos';

export default function ReimbursementSubmit(props: { employee: User }) {
  const [amountInput, setAmountInput] = useState<string>('');
  const [descInput, setDescInput] = useState<string>('');

  async function submitReimbursement() {
    const response = await axios.post(
      `${backendAddress}/employees/${props.employee.id}/reimbursements`,
      {
        username: props.employee.username,
        id: '',
        amount: amountInput,
        date: String(Date.now() / 1000),
        comment: descInput,
        isApproved: false,
        isPening: true,
      }
    );
    const employee: Employee = response.data;
    alert(`Submitted reimbursement for ${employee.username}`);
  }
  return (
    <>
      <Text>Submit a reimbursement here</Text>
      <TextInput
        style={styles.input}
        placeholder='amount'
        onChangeText={setAmountInput}
        autoCapitalize='none'
      />
      <TextInput
        style={styles.input}
        placeholder='description'
        onChangeText={setDescInput}
        autoCapitalize='none'
      />
      <Button
        onPress={submitReimbursement}
        title='Submit Reimbursement'
        color='#841584'
        accessibilityLabel='Submit Reimbursement Here'
      />
    </>
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
