import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppointmentTimes from '../../components/AppointmentTimes';

const AppointmentScreen = () => {

    return(
        <View style={styles.container}>
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
      padding: 10
    }
  });

export default AppointmentScreen