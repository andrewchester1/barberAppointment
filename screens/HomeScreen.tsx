import React, { useContext, useEffect, useState } from 'react';
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
import FirestoreBarberInfoUtil from '../utils/FirestoreBarberInfoUtil';
import FirestoreUpcomingAppointmentsUtil from '../utils/FirestoreUpcomingAppointmentsUtil';

const HomeScreen = () => {
    const { user } = useContext(LoginContext);
    const [barberInfo, setBarberInfo] = useState({});
    const [appointmentInfo, setAppointmentInfo] = useState({});
    const [previousAppointmentInfo, setPreviousAppointmentInfo] = useState({})
    
    const signOut = () => {FirebaseUtil.signOut().catch((e) => {
        console.log(e)
        alert('Something went wrong')
    })}

    function getBarberInfo() {
        FirestoreBarberInfoUtil.getBarberInfo().then((testData) => {
            const barberData = {
                Price: testData.data().price,
                Location: testData.data().location,
                Phone: testData.data().phone,
                Barber: testData.data().name
            };
            setBarberInfo(barberData)
            console.log('barberData: ', barberData);
            return barberData;
            // console.log(e)
        });
    }

    function getAppointmentInfo() {
        FirestoreUpcomingAppointmentsUtil.getAppointmentInfo().then((appointmentData) => {
            const appointmentsData = {
                'Appointment Time': appointmentData.data().upcoming,
                Time: appointmentData.data().time
            };
            const previousAppointmentData = {
                Previous: appointmentData.data().previous
            }
            setAppointmentInfo(appointmentsData)
            setPreviousAppointmentInfo(previousAppointmentData)
            console.log('appointmentsData: ', appointmentsData);
            return appointmentsData;
            // console.log(e)
        });
    }

    useEffect(() => {
        getBarberInfo()
        getAppointmentInfo()
        }, [])

        const upcomingAppointData = {...appointmentInfo, ...barberInfo}
        console.log('upcomingAppointData', upcomingAppointData)

    const Tab = createBottomTabNavigator();

    return(
        <View style={styles.container}>
            <FirebaseApp />
            <Card containerStyle={{ flex: 2, borderRadius: 15 }}>
                <Card.Title style={{ fontSize: 15 }}> Upcoming Appointment </Card.Title>
                <Card.Divider />
                { Object.entries(upcomingAppointData).map((onekey, i) => (
                    <>
                        <Text key={i}> {onekey[0]}: {onekey[1]} </Text>
                    </>
                ))}
                {/* <Text style={{ textAlign: 'center'}}> No Upcoming Appointments Scheduled </Text> */}
                
            </Card>
            <Card containerStyle={{ flex: 2, borderRadius: 15 }}>
                <Card.Title style={{ fontSize: 15 }}> Previous Appointment </Card.Title>
                <Card.Divider />
                { Object.entries(previousAppointmentInfo).map((onekey, i) => (
                    <>
                        <Text style={{ alignContent:'flex-start'}} key={i}> {onekey[0]}: {onekey[1]} </Text>
                    </>
                ))}
                
                    {/* <Text style={{ textAlign: 'center'}}> You do not have any Previous Appointments</Text> */}
            
            </Card>
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
