import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import FirebaseUtil from '../utils/FirebaseUtil';
import { LoginContext } from '../utils/LoginProvider';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppointmentCalendar from '../components/AppointmentCalendar';
import AppointmentTimes from '../components/AppointmentTimes';
import firestore from '@react-native-firebase/firestore'
import moment from 'moment';

const AppointmentScreen = () => {
    const [dateInfo, setDateInfo] = useState({});
    const { user } = useContext(LoginContext);

    const onGetData = async () => {
        const snapshot = await firestore()
        .collection(moment().format('MMM YY'))
        .doc(moment().format('YYYY-MM-DD')).get()
        setDateInfo(snapshot)
        console.log('snapshot: ', snapshot)
    }

    console.log('dateInfo: ', dateInfo)
    // const Item = ({ title }) => (
    //     <View style={styles.item}>
    //       <Text style={styles.title}>{title}</Text>
    //     </View>
    //   );

    //   const renderItem = ({ item }) => (
    //     <Item title={item.title} />
    //   );
    {onGetData()}
    return(
        <View style={styles.container}>
            {/* <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignContent: 'center',
      padding: 10
    }
  });

export default AppointmentScreen