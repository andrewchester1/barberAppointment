import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import firestore from '@react-native-firebase/firestore'
import moment from 'moment';
import { Card, ListItem } from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';

const AdminAddAppointmentScreen = ( { route, navigation } ) => {
    const [isLoading, setIsLoading] = useState(true);
    const [number, onChangeNumber] = useState('');
    const [name, onChangeName] = useState('');
    const [time, onChangeTime] = useState('');
    const [comment, onChangeComment] = useState('');
    const [selectedDate, setSelectedDate] = useState(moment());
    const [formattedDate, setFormattedDate] = useState();

    useEffect(() => {
        setSelectedDate(moment())
        const {formattedDate, time} = route.params ? route.params : ''
        formattedDate ? setFormattedDate(formattedDate) : ''
        time ? onChangeTime(time[0]) : ''
    }, [])
    
      const onDateSelected = selectedDate => {
        setSelectedDate(selectedDate);
        setFormattedDate(selectedDate.format('YYYY-MM-DD'));
        setIsLoading(true)
      }

      const scheduleAppoint =  () => {
        const userAppointmentInfo = {
            name: name,
            comment: comment,
            time : time,
            phone : number
        };

        firestore()
        .collection('Calendar')
        .doc(moment(formattedDate).format('MMM YY'))
        .collection(moment(formattedDate).format('YYYY-MM-DD')).doc(moment(time, 'HH:mm a').format("hh:mm A").toString().replace(/^(?:00:)?0?/, ''))
        .set(userAppointmentInfo, {merge: true})
        .then(() => {
            alert(`Thanks , your appointment has been scheduled`)
        }).catch((error) => {
            alert('Something went wrong try again')
        }); 
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
            <View style={{flex: 5}}>
                <ListItem bottomDivider>
                    <ListItem.Content style={{ alignItems: 'center', marginTop: -5}}>
                        <ListItem.Title> {formattedDate ? 'Selected Date' + formattedDate : 'Choose a date'} </ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                { formattedDate &&
                    <Card>
                        <Card.Divider/>
                        <Text>Choose a time for the appointment</Text>
                        <TextInput 
                        style={{borderColor: 'black', borderWidth: 1, marginBottom: 10}} 
                        onChangeText={onChangeTime}
                        value={time}
                        />

                        <Text>Name of Client</Text>
                        <TextInput 
                        style={{borderColor: 'black', borderWidth: 1, marginBottom: 10}} 
                        onChangeText={onChangeName}
                        value={name}
                        />

                        <Text>Phone Number of Client</Text>
                        <TextInput 
                        style={{borderColor: 'black', borderWidth: 1, marginBottom: 10}} 
                        onChangeText={onChangeNumber}
                        value={number}
                        />

                        <Text>Comment for Haircut</Text>
                        <TextInput 
                        style={{borderColor: 'black', borderWidth: 1, marginBottom: 10}} 
                        onChangeText={onChangeComment}
                        value={comment}
                        />

                        <Button title={'Add Appointment'} onPress={() => scheduleAppoint()}/>
                    </Card>
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