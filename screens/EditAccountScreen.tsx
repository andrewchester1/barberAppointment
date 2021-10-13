import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import FirebaseUtil from '../utils/FirebaseUtil';
import { LoginContext } from '../utils/LoginProvider';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppointmentCalendar from '../components/AppointmentCalendar';
import AppointmentTimes from '../components/AppointmentTimes';
import { ListItem } from 'react-native-elements';
import { firebase } from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';

const EditAccountScreen = () => {
    const [userInfo, setUserInfo] = useState([]);

    async function getUsers() {
        const snapshot = await firebase.firestore().collection('Test').get()
        const data = snapshot.docs.map(doc => doc.data());
        console.log('data', data)
        setUserInfo(data)
    }

    useEffect(() => {
        getUsers()
        }, [])

    return(
        <View style={styles.container}>
            <ScrollView>
                { userInfo &&
                    userInfo.map((onekey, i) => (
                        <><ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={{ fontWeight: 'bold', textAlign: 'center', alignSelf: 'center'}} key={i}>Name: {onekey.name} </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title key={i}> User Id: {onekey.user_id ? onekey.user_id : 'N/A'} </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title key={i}> Phone: {onekey.phone ? onekey.phone : 'N/A'} </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title key={i}> Upcoming Appointment: {onekey.upcoming ? onekey.upcoming : 'N/A'} </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title key={i}> Appointment Time: {onekey.time ? onekey.time : 'N/A'} </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title key={i}> Previous Appointment: {onekey.previous ? onekey.previous : 'N/A'} </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        </>
                        
                ))}
            </ScrollView>
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

export default EditAccountScreen