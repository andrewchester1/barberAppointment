import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements'
import FirebaseApp from '../components/UserName';
import FirebaseUtil from '../utils/FirebaseUtil';
import FirestoreUtil from '../utils/FirestoreUtil';
import { LoginContext } from '../utils/LoginProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './LoginScreen';
import AboutScreen from './AboutScreen';
import UserAppointmentsUtil from '../components/UserAppointments';

const HomeScreen = () => {
    const { user } = useContext(LoginContext);
    const signOut = () => {FirebaseUtil.signOut().catch((e) => {
        console.log(e)
        alert('Something went wrong')
    })}

    const Tab = createBottomTabNavigator();

    return(
        <View style={styles.container}>
            <FirebaseApp />
            <UserAppointmentsUtil />
            <Button onPress={() => signOut()} title='Logout' />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignContent: 'center',
    }
  });

export default HomeScreen
