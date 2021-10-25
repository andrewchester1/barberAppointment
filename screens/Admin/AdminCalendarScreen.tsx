import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import firestore from '@react-native-firebase/firestore'
import moment from 'moment';
import { ListItem } from 'react-native-elements';

const AppointmentScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [calendarData, setCalendarData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(moment());
    const [formattedDate, setFormattedDate] = useState();
    const [availibility, setAvailibility] = useState({'Tuesday': '', 'Wednesday': '', 'Thursday': '', 'Friday': '', 'Saturday': ''})

    async function getUserId(selectedDate) {
          await firestore().collection('Barber').doc('Nate').get().then((doc) => {
          const databaseAvailibility = {...availibility, ...doc.data()}
          setAvailibility({ ...availibility, ...databaseAvailibility})
          splitHours(selectedDate)
      })
  }
  
    const splitHours = async (selectedDate) => {

      const weekDay = Promise.resolve(moment(selectedDate, "YYYY-MM-DD HH:mm:ss").format('dddd').toString())
      console.log('weekDay', weekDay)
        Promise.all([weekDay]).then(values => {
            createAvailableTimes(availibility[`${values}`], selectedDate)
            console.log('availibility[`${values}`]', availibility[`${values}`])
          });
  }

    function createAvailableTimes(newWeekDay, selectedDate) {
      let arr = newWeekDay
      console.log('arr', arr)
      const newSplitString = arr.toUpperCase().split("-").map(item => item.trim());
      const startTime = moment(newSplitString[0], 'HH:mm a')
      const endTime = moment(newSplitString[1], 'HH:mm a')
      let newIntervals = {}
      while (startTime <= endTime) {
          let newobj = {[moment(startTime, 'HH:mm a').format("hh:mm A").toString().replace(/^(?:00:)?0?/, '')] : '' }
          newIntervals = {...newIntervals, ...newobj}
          startTime.add(30, 'minutes')
      }
      console.log('newIntervals', newIntervals)
      onGetData(selectedDate, newIntervals)
    }

    async function onGetData(selectedDate, newIntervals) {
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
            setCalendarData([newIntervals, ...data])
        })
    }

    useEffect(() => {
        setSelectedDate(moment())
    }, [])
    
      const onDateSelected = selectedDate => {
        setSelectedDate(selectedDate.format('YYYY-MM-DD'));
        setFormattedDate(selectedDate.format('YYYY-MM-DD'));
        setIsLoading(true)
        getUserId(selectedDate)
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
    
      console.log('calendarData', calendarData)
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
                { isLoading ? 
                    <ActivityIndicator size="large" color="#0000ff" />
                  : calendarData && isLoading &&
                    <ScrollView style={{ borderColor: 'black', borderRadius: 15}}>
                        {
                        calendarData.map(([key, value]) => (
                            <ListItem key={key} bottomDivider 
                            onPress={() => Alert.alert('Delete', `Are you sure you want to delete this ${"\n"}Appointment Time ${"\n"} with Client:`, 
                            [
                                {
                                  text: "Cancel"
                                },
                                { text: "Delete Appointment", onPress: () => '(deleteAppointment(anObjectMapped.time))' }
                              ]) }> 
                                <ListItem.Content>
                                    <ListItem.Title>{value} </ListItem.Title>
                                    {/* <ListItem.Subtitle>Client: {value.name}</ListItem.Subtitle>
                                    <ListItem.Subtitle>Phone: {value.phone}</ListItem.Subtitle>
                                    <ListItem.Subtitle>Comment: {value.comment}</ListItem.Subtitle> */}
                                </ListItem.Content>
                            </ListItem>
                            ))
                        }  
                    </ScrollView > 
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