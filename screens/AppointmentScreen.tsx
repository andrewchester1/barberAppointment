import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import FirebaseUtil from '../utils/FirebaseUtil';
import { LoginContext } from '../utils/LoginProvider';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppointmentCalendar from '../components/AppointmentCalendar';
import AppointmentTimes from '../components/AppointmentTimes';

const AppointmentScreen = () => {
    const { user } = useContext(LoginContext);

    return(
        <View style={styles.container}>
            <AppointmentCalendar />
            <AppointmentTimes />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignContent: 'center',
      padding: 20
    }
  });

export default AppointmentScreen