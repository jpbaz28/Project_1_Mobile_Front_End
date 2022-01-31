import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { backendAddress } from '../../dtos/backend-address';
import { Reimbursement } from '../../dtos/dtos';

export default function ReimbursementViewer() {
  const [reimburses, setReimburses] = useState([]);

  async function getAllReimbursements() {
    const response = await axios.get(`${backendAddress}/reimbursements`);
    const reimburses: Reimbursement[] = response.data;
    setReimburses(reimburses);
  }

  useEffect(() => {
    getAllReimbursements();
  }, []);

  return (
    <>
      <FlatList
        data={reimburses}
        renderItem={({ item }) =>
          ReimburseItem({ reim: item, updateReims: setReimburses })
        }
        keyExtractor={(item) => item.id}
      />
    </>
  );
}

function ReimburseItem(props: { reim: Reimbursement; updateReims: Function }) {
  async function approveReimburse() {
    const response = await axios.patch(
      `${backendAddress}/reimbursements/approve/${props.reim.username}/${props.reim.id}`
    );
    const reimburses: Reimbursement[] = response.data;
    props.updateReims(reimburses);
  }

  async function denyReimburse() {
    const response = await axios.patch(
      `${backendAddress}/reimbursements/deny/${props.reim.username}/${props.reim.id}`
    );
    const reimburses: Reimbursement[] = response.data;
    props.updateReims(reimburses);
  }

  return (
    <View>
      <Text>
        {' '}
        Username {props.reim.username} Amount {props.reim.amount} Comment{' '}
        {props.reim.comment} Date{' '}
        {new Date(Number(props.reim.date) * 1000).toDateString()}{' '}
        {props.reim.isPending ? (
          <View>
            <Button title={'Approve'} onPress={approveReimburse}></Button>
            <Button title={'Deny'} onPress={denyReimburse}></Button>
          </View>
        ) : (
          <View>
            {props.reim.isApproved ? (
              <Text>'Approved'</Text>
            ) : (
              <Text>'Denied'</Text>
            )}
          </View>
        )}
      </Text>
    </View>
  );
}
