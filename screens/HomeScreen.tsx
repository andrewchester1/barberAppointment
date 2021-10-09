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
import FirestoreUserNameUtil from '../utils/FireStoreUserNameUtil';

const HomeScreen = () => {
    const { user } = useContext(LoginContext);
    const [barberInfo, setBarberInfo] = useState({});
    const [appointmentInfo, setAppointmentInfo] = useState({});
    const [previousAppointmentInfo, setPreviousAppointmentInfo] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [userName, setUserName] = useState();

    function getUserName() {
        FirestoreUserNameUtil.getUserName().then((userData) => {
            const userInfo = {
                Email: userData.data().email,
                Phone: userData.data().phone
            };
            const userName = userData.data().name
            setUserInfo(userInfo)
            setUserName(userName)
            console.log('barberData: ', userData);
            return userData;
            // console.log(e)
        });
    }

    function getBarberInfo() {
        FirestoreBarberInfoUtil.getBarberInfo().then((testData) => {
            const barberData = {
                Price: 'Price ' + testData.data().price,
                Location: testData.data().location,
                Phone: testData.data().name + "'s Phone: " + testData.data().phone
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
                Date: appointmentData.data().upcoming + ' @ ' + appointmentData.data().time
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
        getUserName()
        }, [])

        const upcomingAppointData = {...appointmentInfo, ...barberInfo}
        console.log('upcomingAppointData', upcomingAppointData)

    const Tab = createBottomTabNavigator();

    return(
        <View style={styles.container}>
            <Card containerStyle={{ flex: 1, margin: 0}}>
                <Card.Title style={{ fontSize: 15}}> {userName} </Card.Title>
                <Card.Divider/>
                { Object.entries(userInfo).map((onekey, i) => (
                    <>
                        <Text key={i}> {onekey[0]}: {onekey[1]} </Text>
                    </>
                ))}
            </Card>
            <Card containerStyle={{ flex: 3, borderRadius: 5, marginBottom: 10 }}>
                <Card.Title style={{ fontSize: 15, textAlign:'left' }}> Upcoming Appointment </Card.Title>
                <Card.Divider />
                { Object.entries(upcomingAppointData).map((onekey, l) => (
                    <>
                        <Text key={l}> {onekey[1]} </Text>
                    </>
                ))}
                <Text></Text>
                <Card.Divider />
                <Card.Title style={{ fontSize: 15, textAlign:'left' }}> Upcoming Appointment </Card.Title>
                <Card.Divider />
                { Object.entries(previousAppointmentInfo).map((onekey, n) => (
                    <>
                        <Text style={{ alignContent:'flex-start'}} key={n}> {onekey[0]}: {onekey[1]} </Text>
                    </>
                ))}
                {/* <Text style={{ textAlign: 'center'}}> No Upcoming Appointments Scheduled </Text> */}
            </Card>
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
