import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, TextInput, Button, ActivityIndicator } from 'react-native';
import AppointmentTimes from '../../components/AppointmentTimes';
import CalendarStrip from 'react-native-calendar-strip';
import { color } from 'react-native-elements/dist/helpers';
import { Card, ListItem } from 'react-native-elements';
import firestore from '@react-native-firebase/firestore'
import FirestoreBarberInfoUtil from '../../utils/FirestoreBarberInfoUtil';
import auth from '@react-native-firebase/auth'

const AppointmentScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(moment());
    const [formattedDate, setFormattedDate] = useState();
    const [calendarDatesRemoved, setCalendarDatesRemoved] = useState([])
    const [intervals, setIntervals ] = useState({}) 
    const [times, setTimes] = useState({})
    const [timePicked, setTimePicked] = useState(false)
    const [selectedTime, setSelectedTime] = useState('')
    const [barberInfo, setBarberInfo] = useState({})

    const onDateSelected = selectedDate => {
        setSelectedDate(selectedDate.format('YYYY-MM-DD'));
        setFormattedDate(selectedDate.format('YYYY-MM-DD'));
        setIsLoading(true)
        splitHours()
    }

    const splitHours = async () => {
        const weekDay = moment(selectedDate, "YYYY-MM-DD HH:mm:ss")
        const newWeekDay = weekDay.format('dddd').toString()
        console.log('newWeekDay', newWeekDay)
        let availibility = {'Tuesday': '', 'Wednesday': '', 'Thursday': '', 'Friday': '', 'Saturday': ''}
        await firestore().collection('Barber').doc('Nate').get().then((doc) => {
            availibility = {...availibility, ...doc.data()}
            const arr = availibility[newWeekDay]
            console.log('arr', availibility[newWeekDay])
        })
        console.log('availibility', availibility)
        createAvailableTimes(availibility, newWeekDay)
    }
//.toString().toUpperCase().split("-").map(item => item.trim());
    const createAvailableTimes = (availibility, newWeekDay) => {
        var arr = availibility[newWeekDay]
        console.log('arr', arr)
        const startTime = moment(arr[0], 'HH:mm a')
        const endTime = moment(arr[1], 'HH:mm a')
        console.log('startTime', startTime)
        let newIntervals = {}
        while (startTime <= endTime) {
            let newobj = {[moment(startTime, 'HH:mm a').format("hh:mm A").toString().replace(/^(?:00:)?0?/, '')] : '' }
            newIntervals = {...newIntervals, ...newobj}
            startTime.add(30, 'minutes')
        }
        setIntervals({...newIntervals })
        console.log('newIntervals', intervals)
        onGetData()
    }

    const onGetData = async () => {
        await firestore()
        .collection('Calendar')
        .doc(moment(formattedDate).format('MMM YY'))
        .collection(moment(formattedDate).format('YYYY-MM-DD')).get()
        .then(snapshot => {
            let data = {}
            snapshot.forEach(doc => {
                let newdata = {[doc.id] : 'Taken'}
                data = { ...data, ...newdata}
            });
            setTimes({ ...intervals, ...data})
            console.log('data', times)
        })
    }

    const removeMonSun = () => {
        let dateArray = []
        let currentDate = moment()
        const stopDate = moment().add(30, 'days');
        while (currentDate <= stopDate) {
            if(moment(currentDate).format('dddd') == 'Sunday' || moment(currentDate).format('dddd') == 'Monday' ) {
                dateArray.push( moment(currentDate).format('YYYY-MM-DD'))
            }
            currentDate = moment(currentDate).add(1, 'days');
        }
        setCalendarDatesRemoved( dateArray)
        console.log('calendarDatesRemoved', calendarDatesRemoved)
    }

    const scheduleAppointment = (time) => {
        setTimePicked(true)
        getBarberInfo(time)
    }

    const getBarberInfo = (time) => {
        FirestoreBarberInfoUtil.getBarberInfo().then((testData) => {
            const barberData = {
                Price: testData.data().price,
                Address: testData.data().location
            };
            setBarberInfo({ ...barberInfo, ...barberData})
            console.log('barberData', barberInfo)
            setSelectedTime(time)
        });
    };

    const [userName, setUserName] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [availibility, setAvailibility] = useState({'Tuesday': '', 'Wednesday': '', 'Thursday': '', 'Friday': '', 'Saturday': ''})
    const [loading, setLoading] = useState(Boolean);

    const getUserId = async () => {
    const userData = auth().currentUser;
        await firestore().collection("Test").doc(userData.uid).onSnapshot(doc => {
            setUserName(doc.data().name );
            setUserPhone( doc.data().phone) 
            console.log('setUserName', setUserName)
        })
        
            await firestore().collection('Barber').doc('Nate').get().then((doc) => {
            const databaseAvailibility = {...doc.data()}
            console.log('databaseAvailibility', availibility)
            //const arr = availibility[newWeekDay]
            return setLoading(false), setAvailibility({...availibility, ...databaseAvailibility})
        })
    }

    const scheduleAppoint = async (selectedDate, selectedTime) => {
    const userAppointmentInfo = {
        name: userName,
        comment: text,
        time : selectedTime,
        phone : userPhone
    };

        await firestore()
        .collection('Calendar')
        .doc(moment(selectedDate).format('MMM YY'))
        .collection(moment(selectedDate).format('YYYY-MM-DD')).doc(selectedTime)
        .set(userAppointmentInfo, {merge: true})
        .then(() => {
            addAppointmentToUser(selectedDate, selectedTime)
            console.log('It worked!!!!!')
            alert(`Thanks ${userName}, your appointment has been scheduled`)
        }).catch((error) => {
            console.log('Error updating the document: ', error)
            alert('Something went wrong try again')
        }); 
    }

    const [previousAppointment, setPreviousAppointment] = useState('')

    const addAppointmentToUser = async (selectedDate, selectedTime) => {
        const userData = auth().currentUser;
        await firestore().collection('Test').doc(userData.uid).get().then((data) => {
            const oldAppointmentData = data.data().upcoming
            setPreviousAppointment(oldAppointmentData)
        })
        addAppointmentDataBase(userData, selectedDate, selectedTime)
    }

    const addAppointmentDataBase = async (userData, selectedDate, selectedTime) => {
        const appointmentData = {
            previous: previousAppointment,
            upcoming: selectedDate,
            time: selectedTime,
        };
    await firestore().collection('Test').doc(userData.uid).set( appointmentData, {merge: true})
    }

    useEffect(() => {
        removeMonSun()
        getUserId()
        setLoading(true)
        console.log('arr', availibility)
    }, [])

    const [text, onChangeText] = useState('')

    return(
        <View style={styles.container}>
            {loading ?
          <><View style={{ flex: 1 }}>
                    <CalendarStrip
                        scrollable
                        style={{ height: 100, paddingTop: 10, paddingBottom: 10 }}
                        calendarHeaderStyle={{ color: 'white', fontSize: 17 }}
                        calendarColor={'grey'}
                        dateNumberStyle={{ color: 'white' }}
                        dateNameStyle={{ color: 'white' }}
                        iconContainer={{ flex: 0.1 }}
                        highlightDateNameStyle={{ color: 'white' }}
                        highlightDateNumberStyle={{ fontWeight: 'bold', color: 'white' }}
                        highlightDateContainerStyle={{ backgroundColor: 'black' }}
                        selectedDate={selectedDate}
                        onDateSelected={onDateSelected}
                        datesBlacklist={calendarDatesRemoved} />
                    <Text style={{ fontSize: 15, alignSelf: 'center' }}>Selected Date: {formattedDate ? formattedDate : 'Choose a date'}</Text>
                </View><View style={{ flex: 4 }}>
                        {formattedDate && times &&
                            <ScrollView style={{ borderColor: 'black', borderRadius: 15 }}>
                                {Object.entries(times).map((onekey, i) => (
                                    <ListItem key={i} bottomDivider onPress={() => scheduleAppointment(onekey[0])}>
                                        <ListItem.Content>
                                            <ListItem.Title>{onekey[1] ? null : onekey[0]}</ListItem.Title>
                                        </ListItem.Content>
                                    </ListItem>
                                ))}
                            </ScrollView>}
                        {timePicked ?
                            <Card containerStyle={{ flex: 2, borderRadius: 15 }}>
                                <Card.Title style={{ fontSize: 15 }}>{selectedDate} @{selectedTime}</Card.Title>
                                <Card.Divider />
                                {Object.entries(barberInfo).map((onekey, i) => (
                                    <Text key={i}>{onekey[0]}: {onekey[1]}</Text>
                                ))}
                                <Text>Total time: ~30 minutes</Text>
                                <TextInput
                                    // style={styles.input}
                                    onChangeText={onChangeText}
                                    value={text}
                                    placeholder="Comment" />
                                <Button onPress={() => scheduleAppoint(formattedDate, selectedTime)} title='Confirm Appointment' />
                            </Card> :
                            <View></View>}
                    </View></>
                    : <Text>Loading</Text>
            }
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