import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ScrollView, ActivityIndicator, Alert } from 'react-native';
import FirebaseUtil from '../utils/FirebaseUtil';
import { LoginContext } from '../utils/LoginProvider';
import CalendarStrip from 'react-native-calendar-strip';
import firestore from '@react-native-firebase/firestore'
import moment from 'moment';
import { Card, ListItem } from 'react-native-elements';
import UserName from '../components/UserName'
import { TextInput } from 'react-native-gesture-handler';

const AdminAddAppointmentScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [calendarData, setCalendarData] = useState([]);

    console.log('calendarData',calendarData)

    useEffect(() => {
        setSelectedDate(moment())
    }, [])

    const [selectedDate, setSelectedDate] = useState(moment());
    const [formattedDate, setFormattedDate] = useState();
    
      const onDateSelected = selectedDate => {
        setSelectedDate(selectedDate);
        setFormattedDate(selectedDate.format('YYYY-MM-DD'));
        setIsLoading(true)
      }

    const addAppointmentToDatabase = (time, name, comment, phone) => {

    }
    

    return(
        <View style={styles.container}> 
            <View style={{flex: 1}}>
                <CalendarStrip
                scrollable
                style={{height:100, paddingTop: 10, paddingBottom: 10}}
                calendarHeaderStyle={{color: 'white', fontSize: 17}}
                calendarColor={'grey'}
                dateNumberStyle={{color: 'white'}}
                dateNameStyle={{color: 'white'}}
                iconContainer={{flex: 0.1}}
                highlightDateNameStyle={{color: 'white'}}
                highlightDateNumberStyle={{fontWeight: 'bold', color: 'white'}}
                highlightDateContainerStyle={{backgroundColor: 'black'}}
                selectedDate={selectedDate}
                onDateSelected={onDateSelected}
                />
                
            </View>
            <View style={{flex: 4}}>
                { formattedDate ?
                    <Card>
                        <Card.Title>Selected Date: {formattedDate}</Card.Title>
                        <Card.Divider/>
                        <Text>Choose a time for the appointment</Text>
                        <TextInput style={{borderColor: 'Black', borderWidth: 1, marginBottom: 10}} />
                        <Text>Name of Client</Text>
                        <TextInput style={{borderColor: 'Black', borderWidth: 1, marginBottom: 10}} />
                        <Text>Phone Number of Client</Text>
                        <TextInput style={{borderColor: 'Black', borderWidth: 1, marginBottom: 10}} />
                        <Text>Comment for Haircut</Text>
                        <TextInput style={{borderColor: 'Black', borderWidth: 1, marginBottom: 10}} />
                        <Button title={'Add Appointment'} onPress={() => 'addAppointmentToDatabase()'}/>
                    </Card>
                    : <Text style={{ alignSelf: 'center' }}>Choose date for appointment</Text>
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
      alignContent: 'center'
    }
  });

export default AdminAddAppointmentScreen