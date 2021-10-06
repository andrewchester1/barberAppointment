import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import moment from 'moment';

class UserAppointmentsUtil extends Component {
    state = {
        Appointments: {
            barber: '',
            previous: '',
            price: '',
            upcoming: '',
            time: ''
        }
    }
    constructor(props) {
        super(props);
        this.getUser();
        const userData = auth().currentUser;
        this.subscriber = firestore().collection("Test").doc(userData.uid).collection('Appointments').doc
        (userData.uid).onSnapshot(doc => {
            this.setState({
                Appointments: {
                    barber: doc.data().barber,
                    previous: doc.data().previous,
                    price: doc.data().price,
                    upcoming: doc.data().upcoming,
                    time: doc.data().time
                }}); this.dateCheck()
        }); 
    }

    getUser = async () => {
        const userData = auth().currentUser;
        const userDocument = await firestore().collection('Test').doc(userData.uid).collection('Appointments').doc(userData.uid).get()
    }

    dateCheck = async () => {
        const upcomingAppointment = new moment(this.state.Appointments.upcoming).format('YYYY-MM-DD').toString()
        console.log('upcomingAppointment', upcomingAppointment)
        const dateToday = new moment().format('YYYY-MM-DD').toString()
        console.log('dateToday: ', dateToday)
        const userData = auth().currentUser;
        if (dateToday > upcomingAppointment) {
            const test = await firestore().collection('Test').doc(userData.uid).collection('Appointments').doc(userData.uid).update({previous: upcomingAppointment, upcoming: ''})
            console.log('test: ', test)
        }
    }

    render() {
        return (
            <><Card containerStyle={{ flex: 2, borderRadius: 15 }}>
                <Card.Title style={{ fontSize: 15 }}> Upcoming Appointment </Card.Title>
                <Card.Divider />
                { this.state?.Appointments?.upcoming && this.state?.Appointments?.upcoming != '' ?
                    <>
                    <Text> Date: {this.state.Appointments.upcoming} </Text>
                    <Text> Time: {this.state.Appointments?.time} </Text>
                    <Text> Price: {this.state.Appointments.price} </Text>
                    <Text> Barber: {this.state.Appointments.barber} </Text>
                    </>
                 : <Text style={{ textAlign: 'center'}}> No Upcoming Appointments Scheduled </Text>
                }
            </Card>
            <Card containerStyle={{ flex: 2, borderRadius: 15 }}>
                <Card.Title style={{ fontSize: 15 }}> Previous Appointment </Card.Title>
                <Card.Divider />
                { this.state?.Appointments?.previous && this.state?.Appointments?.previous != ''  ?
                    <Text> Date: {this.state.Appointments.previous} </Text>
                :   
                    <Text style={{ textAlign: 'center'}}> You do not have any Previous Appointments</Text>
                }
            </Card></>
        )
    }
}

export default UserAppointmentsUtil
