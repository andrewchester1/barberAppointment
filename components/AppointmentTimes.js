import React, { Component } from 'react';
import { View, Text, ScrollView, Button, ActivityIndicator } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

class AppointmentTimes extends Component {
    state = {
        time: {},
        final: {},
        showAppointments: false,
        userName: '',
        appointmentData: {}
    }
    AppoitnmentTime = {
        '8:00 am': '',
        '8:30 am': '',
        '9:00 am': '',
        '9:30 am': '',
        '10:00 am': '',
        '10:30 am': '',
        '11:00 am': '',
        '11:30 am': '',
        '12:00 pm': '',
        '12:30 pm': '',
        '1:00 pm': '',
        '1:30 pm': '',
        '2:00 pm': '',
        '2:30 pm': '',
        '3:00 pm': '',
        '3:30 pm': '',
        '4:00 pm': '',
        '4:30 pm': '',
        '5:00 pm': '',
        '5:30 pm': '',
        '6:00 pm': '',
        '6:30 pm': '',
        '7:00 pm': '',
        '7:30 pm': '',
        '8:00 pm': '',
    }
    constructor(props) {
        super(props);
        this.state = { 
            time : {},
            final: {},
            isLoading: false,
            selectedStartDate: null,
            confirmTime: false,
            selectedTime: null,
            userName: '',
            appointmentData: {},
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date) {
        this.setState({
          selectedStartDate: date,
          isLoading: false,
          confirmTime: false,
        });
      }
    
    onButtonClick() {
        this.onGetData()
        this.setState({
            isLoading: true,
          });
    }

    onTimeClick(value) {
        this.confirmAppointmentTime()
        this.getUserId()
        this.setState({
            isLoading: false,
            confirmTime: true,
            selectedTime: value,
        }); 
    }

    confirmAppointmentTime = () => {

    }
    
    onGetData = async () => {
        const { selectedStartDate } = this.state;
        this.state.final = {}
        firestore()
        .collection(moment(selectedStartDate).format('MMM YY'))
        .doc(moment(selectedStartDate).format('YYYY-MM-DD')).onSnapshot(doc => {
            this.setState({ time: doc.data() })
            this.setState({ final: {...this.AppoitnmentTime, ...this.state.time}})
        }); this.setState({isLoading:true})
    }

    getUserId = () => {
    const userData = auth().currentUser;
        firestore().collection("Test").doc(userData.uid).onSnapshot(doc => {
            this.setState({ userName: doc.data().name }); 
        })
    }

    scheduleAppoint = async (selectedDate, selectedTime) => {
        const newSelectedTime = selectedTime
        const userAppointmentInfo = {
            [`${newSelectedTime}`] : this.state.userName
        };

        const test = await firestore()
        .collection(moment(selectedDate).format('MMM YY'))
        .doc(moment(selectedDate).format('YYYY-MM-DD')).set(userAppointmentInfo, {merge: true})
        .then(() => {
            this.addAppointmentToUser(selectedDate, selectedTime)
            console.log('It worked!!!!!')
            alert('Appointment Scheduled')
        }).catch((error) => {
            console.log('Error updating the document: ', error)
            alert('Something went wrong try again')
        }); 
    }

    addAppointmentToUser = (selectedDate, selectedTime) => {
        console.log('selectedDate', selectedDate)
        const userData = auth().currentUser;
        firestore().collection('Test').doc(userData.uid).collection('Appointments').doc(userData.uid).onSnapshot(doc => {
            const appointmentData = {
                    barber: 'Nate',
                    previous: doc.data()?.upcoming ? doc.data().upcoming : '',
                    price: '$40',
                    upcoming: selectedDate,
                    time: selectedTime,
                }; this.addAppointmentDataBase(userData, appointmentData)
        }); 
    }

    addAppointmentDataBase = (userData, appointmentData) => {
        firestore().collection('Test').doc(userData.uid).collection('Appointments').doc(userData.uid).set( appointmentData, {merge: true})
        console.log('this.state.appointmentData', appointmentData)
    }

    render() {
        const { selectedStartDate, isLoading, final, confirmTime, selectedTime } = this.state;
        const selectedDate = selectedStartDate ? moment(selectedStartDate).format('YYYY-MM-DD').toString() : '';
        const today = moment()
        let minDate = new Date()
        let maxDate = today.add(30, 'day');
        return (
            <><View style={{ flex: 1 }}>
                <CalendarPicker
                    minDate={minDate}
                    maxDate={maxDate}
                    onDateChange={this.onDateChange} />
                <View>
                    <Text>Selected Date: {selectedDate}</Text>
                </View>
                <View>
                    <Button onPress={() => this.onButtonClick()} title='See Available Times' />
                </View>
                { isLoading ?
                    <ScrollView style={{ borderColor: 'black', borderRadius: 15}}>
                    {
                    Object.entries(final).map((onekey, i) => (
                        <ListItem key={i} bottomDivider numColumns={2} onPress={() => this.onTimeClick(onekey[0])}>
                            <ListItem.Content>
                                <ListItem.Title>{onekey[1] ? null : onekey[0]}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        ))
                    }  
                    </ScrollView > : 
                    <View>
                        <Text>Choose a Date</Text>
                    </View>
                }
                { confirmTime ?
                    <Card containerStyle={{ flex: 2, borderRadius: 15 }}>
                        <Card.Title style={{ fontSize: 15 }}>{selectedDate} @ {selectedTime}</Card.Title>
                        <Card.Divider />
                        <Text>Price: $40</Text>
                        <Text>Location: </Text>
                        <Text>Total time: ~30 minutes</Text>
                        <Button onPress={() => this.scheduleAppoint(selectedDate, selectedTime)} title='Confirm Appointment' />
                    </Card> : 
                    <View></View>
                }

            </View></>
        )
    }
}

export default AppointmentTimes