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
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

const HomeScreen = () => {
    const { user } = useContext(LoginContext);
    const [barberInfo, setBarberInfo] = useState({});
    const [appointmentDateInfo, setAppointmentDateInfo] = useState();
    const [appointmentTimeInfo, setAppointmentTimeInfo] = useState();
    const [previousAppointmentInfo, setPreviousAppointmentInfo] = useState();
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
            const appointmentDateData =  appointmentData.data().upcoming
            const appointmentTimeData = appointmentData.data().time
            const previousAppointmentData =  appointmentData.data().previous

            setAppointmentDateInfo(appointmentDateData)
            setAppointmentTimeInfo(appointmentTimeData)
            setPreviousAppointmentInfo(previousAppointmentData)
            dateCheck()
            // console.log(e)
        });
    }

    function dateCheck() {
        const upcomingAppointment = moment(appointmentDateInfo).format('YYYY-MM-DD').toString()
        const dateToday = moment().format('YYYY-MM-DD').toString()
        const userData = auth().currentUser;
        if (dateToday > upcomingAppointment) {
            firestore().collection('Test').doc(userData.uid).collection('Appointments').doc(userData.uid).update({previous: upcomingAppointment, upcoming: ''})
        }
    }

    useEffect(() => {
        getBarberInfo()
        getAppointmentInfo()
        getUserName()
        }, [])

        const upcomingAppointData = {appointmentDateInfo, appointmentTimeInfo, ...barberInfo}
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
                { appointmentDateInfo ?
                     Object.entries(upcomingAppointData).map((onekey, l) => (
                        <>
                            <Text key={l}> {onekey[1]} </Text>
                        </>
                    )) :
                    <Text>No Upcoming Appointments Scheduled</Text>
                }
                <Card.Divider />
                <Card.Title style={{ fontSize: 15, textAlign:'left' }}> Previous Appointment </Card.Title>
                <Card.Divider />
                { previousAppointmentInfo ?
                    <Text style={{ alignContent:'flex-start'}}> {previousAppointmentInfo} </Text>
                    :
                    <Text>No Previous Appointments</Text>
                }
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
