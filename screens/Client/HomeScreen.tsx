import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements'
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

const HomeScreen = () => {
    const [userTestData, setUserData] = useState({'email': '', 'name': '', 'phone': '', 'previous': '', 'time': '', 'upcoming': ''});
    const [barberData, setBarberData] = useState({'location': '', 'price': '', 'phone': ''})

    async function getUserData() {
        const userData = auth().currentUser;
        await firestore().collection('Test').doc(userData.uid).get().then((doc) => {
            setUserData({...userTestData, ...doc.data()})
        })
        await firestore().collection('Barber').doc('Nate').get().then((barber) => {
            setBarberData({...barberData, ...barber.data()})
        })
        dateCheck()
    }

    function dateCheck() {
        const upcomingAppointment = moment(userTestData.upcoming).format('YYYY-MM-DD').toString()
        const dateToday = moment().format('YYYY-MM-DD').toString()
        const userData = auth().currentUser;
        if (dateToday > upcomingAppointment && upcomingAppointment != '') {
            firestore().collection('Test').doc(userData.uid).collection('Appointments').doc(userData.uid).update({previous: upcomingAppointment, upcoming: ''})
        }
    }

    useEffect(() => {
        getUserData()
        }, [])

    return(
        <View style={styles.container}>
            <Card containerStyle={{ flex: 1, margin: 0}}>
                <Card.Title style={{ fontSize: 15}}> {userTestData.name} </Card.Title>
                <Card.Divider/>
                    {userTestData.email != '' && 
                        <Text> {userTestData.email} </Text>
                    }
                    {userTestData.phone != '' && 
                        <Text> {userTestData.phone} </Text>
                    }
            </Card>
            <Card containerStyle={{ flex: 3, borderRadius: 5, marginBottom: 10 }}>
                <Card.Title style={{ fontSize: 15, textAlign:'left' }}> Upcoming Appointment </Card.Title>
                <Card.Divider />
                { userTestData.upcoming != '' ?  
                    <>
                        <Text> {userTestData.upcoming} </Text>
                        <Text> {userTestData.time != '' ? userTestData.time : ''} </Text>
                        <Text> {barberData.price != '' ? barberData.price : '' } </Text>
                        <Text> {barberData.location != '' ? barberData.location : ''} </Text>
                        <Text> {barberData.phone != '' ? barberData.phone : ''} </Text>
                    </>
                :
                    <Text>No Upcoming Appointments Scheduled</Text>
                }
                <Card.Divider />
                <Card.Title style={{ fontSize: 15, textAlign:'left' }}> Previous Appointment </Card.Title>
                <Card.Divider />
                { userTestData.previous != '' ?
                    <Text style={{ alignContent:'flex-start'}}> {userTestData.previous} </Text>
                    :
                    <Text>No Previous Appointments</Text>
                }
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
