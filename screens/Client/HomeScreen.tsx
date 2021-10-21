import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { formatPhoneNumber } from '../../utils/DataFormatting';

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
            firestore().collection('Test').doc(userData.uid).update({previous: upcomingAppointment, upcoming: ''})
        }
    }

    useEffect(() => {
        getUserData()
        }, [])

    return(
        <View style={styles.container}>
            <Card containerStyle={{ flex: 1, margin: 0}}>
                <Card.Title style={{ fontSize: 15}}> {userTestData.name} </Card.Title>
            </Card>
            <View style={{flex: 3}}>
                { userTestData.upcoming != '' ?  
                    <>  
                        <ListItem bottomDivider >
                            <ListItem.Content>
                                <ListItem.Title style={{ fontWeight: 'bold' }}><Text>Upcoming Appointments</Text></ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title >Haircut {userTestData.upcoming} @ {userTestData.time != '' ? userTestData.time : ''}</ListItem.Title>
                                <Text> {barberData.price != '' ? 'Price: ' + barberData.price : '' } </Text>
                                <Text> {barberData.location != '' ? 'Address: ' + barberData.location : ''} </Text>
                                <Text> {barberData.phone != '' ? 'Phone Number: ' + formatPhoneNumber(barberData.phone) : ''} </Text>
                            </ListItem.Content>
                        </ListItem>
                    </>
                :
                    <Text>No Upcoming Appointments Scheduled</Text>
                }
                
                { userTestData.previous != '' ?
                    <ListItem bottomDivider >
                        <ListItem.Content>
                            <ListItem.Title style={{ fontWeight: 'bold' }}>Previous Appointment</ListItem.Title>
                            <Text>{userTestData.previous}</Text>
                        </ListItem.Content>
                    </ListItem>
                    :
                    <Text>No Previous Appointments</Text>
                }
            </View>
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
