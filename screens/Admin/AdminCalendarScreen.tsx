import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import firestore from '@react-native-firebase/firestore'
import moment from 'moment';
import { ListItem } from 'react-native-elements';

const AppointmentScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [calendarData, setCalendarData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(moment());
    const [formattedDate, setFormattedDate] = useState();

    async function onGetData(selectedDate) {
      await firestore()
        .collection('Calendar')
        .doc(moment(selectedDate).format('MMM YY'))
        .collection(moment(selectedDate).format('YYYY-MM-DD')).get()
        .then(snapshot => {
            let data = []
            snapshot.forEach(doc => {
              const tempData = doc.data();
              data.push(tempData)
            });
            setIsLoading(false)
            setCalendarData(data)
        })
    }

    useEffect(() => {
        setSelectedDate(moment())
    }, [])
    
      const onDateSelected = selectedDate => {
        setSelectedDate(selectedDate.format('YYYY-MM-DD'));
        setFormattedDate(selectedDate.format('YYYY-MM-DD'));
        setIsLoading(true)
        onGetData(selectedDate)
      }
    
      const deleteAppointment = (onekey: any) => {
        firestore().collection('Calendar')
        .doc(moment(selectedDate).format('MMM YY'))
        .collection(moment(selectedDate).format('YYYY-MM-DD')).doc(onekey).delete().then(() => {
            console.log('Appointment Deleted');
            Alert.alert('Success', 'Appointment Deleted')
          }).catch((e) => {
              console.log(e)
              Alert.alert('Error', `Unable to delete appointment. Try again. ${e}`)
          })
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
                        <ListItem.Title> {formattedDate ? formattedDate : 'Choose a date'} </ListItem.Title>
                    </ListItem.Content>
                </ListItem>
                {!isLoading && calendarData ?
                    <ScrollView style={{ borderColor: 'black', borderRadius: 15}}>
                        {
                        calendarData.map((anObjectMapped, index) => (
                            <ListItem key={`${anObjectMapped.name} ${anObjectMapped.phone} ${anObjectMapped.time} ${anObjectMapped.comment}`} bottomDivider 
                            onPress={() => Alert.alert('Delete', `Are you sure you want to delete this ${"\n"}Appointment Time @ ${anObjectMapped.time ? anObjectMapped.time : 'N/A'} ${"\n"} with Client: ${anObjectMapped.name ? anObjectMapped.name : 'N/A'}`, 
                            [
                                {
                                  text: "Cancel"
                                },
                                { text: "Delete Appointment", onPress: () => (deleteAppointment(anObjectMapped.time)) }
                              ]) }> 
                                <ListItem.Content>
                                    <ListItem.Title>{anObjectMapped.time} </ListItem.Title>
                                    <ListItem.Subtitle>Client: {anObjectMapped.name}</ListItem.Subtitle>
                                    <ListItem.Subtitle>Phone: {anObjectMapped.phone}</ListItem.Subtitle>
                                    <ListItem.Subtitle>Comment: {anObjectMapped.comment}</ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                            ))
                        }  
                    </ScrollView > 
                    : isLoading && 
                    <ActivityIndicator size="large" color="#0000ff" />
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

export default AppointmentScreen