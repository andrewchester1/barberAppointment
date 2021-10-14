import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, ScrollView, ActivityIndicator, Alert } from 'react-native';
import FirebaseUtil from '../utils/FirebaseUtil';
import { LoginContext } from '../utils/LoginProvider';
import CalendarStrip from 'react-native-calendar-strip';
import firestore from '@react-native-firebase/firestore'
import moment from 'moment';
import { ListItem } from 'react-native-elements';
import UserName from '../components/UserName'

const AppointmentScreen = () => {
    const [dateInfo, setDateInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    async function onGetData(selectedDate) {
        await firestore()
        .collection(moment(selectedDate).format('MMM YY'))
        .doc(moment(selectedDate).format('YYYY-MM-DD')).get().then((data) => {
            const times = data.data()
            setDateInfo(times), setIsLoading(false)
        })
        // const times = data.data()
        // setDateInfo(times), setIsLoading(false)
    }

    console.log('isLoading',isLoading)

    useEffect(() => {
        setSelectedDate(moment())
        console.log('dateInfo',dateInfo)
    }, [])

    const [selectedDate, setSelectedDate] = useState(moment());
    const [formattedDate, setFormattedDate] = useState();
    
      const onDateSelected = selectedDate => {
        setSelectedDate(selectedDate);
        setFormattedDate(selectedDate.format('YYYY-MM-DD'));
        setIsLoading(true)
        onGetData(selectedDate)
      }
    
      const deleteAppointment = (onekey: any) => {
        //let field_id = onekey
        firestore().collection('Oct 21').doc(selectedDate.format('YYYY-MM-DD')).update({
            [onekey]: firestore.FieldValue.delete(),
          }).then(() => {
            console.log('Appointment Deleted');
            Alert.alert('Success', 'Appointment Deleted')
          }).catch((e) => {
              console.log(e)
              Alert.alert('Error', `Unable to delete appointment. Try again. ${e}`)
          })
      }
    

    return(
        <View style={styles.container}> 
            {/* <UserName /> */}
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
        
                <Text style={{fontSize: 15, alignSelf: 'center'}}>Selected Date: {formattedDate}</Text>
                
            </View>
            <View style={{flex: 4}}>
                {!isLoading && dateInfo ?
                    <ScrollView style={{ borderColor: 'black', borderRadius: 15}}>
                        {
                        Object.entries(dateInfo).map((onekey, i) => (
                            <ListItem key={i} bottomDivider onPress={() => Alert.alert('Delete', `Are you sure you want to delete this ${"\n"}Appointment Time @ ${onekey[0] ? onekey[0] : 'N/A'} ${"\n"} with Client: ${onekey[1] ? onekey[1] : 'N/A'}`, 
                            [
                                {
                                  text: "Cancel"
                                },
                                { text: "Delete Appointment", onPress: () => (deleteAppointment(onekey[0])) }
                              ]) }> 
                                <ListItem.Content>
                                    <ListItem.Title>{onekey[0]}</ListItem.Title>
                                    <ListItem.Subtitle>Client: {onekey[1]}</ListItem.Subtitle>
                                    <ListItem.Subtitle>Comments: </ListItem.Subtitle>
                                </ListItem.Content>
                            </ListItem>
                            ))
                        }  
                    </ScrollView > 
                    : isLoading && dateInfo ? 
                    <ActivityIndicator size="large" color="#0000ff" />
                    : 
                    <Text>No Appointments Found</Text>
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