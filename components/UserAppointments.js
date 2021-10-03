import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

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
                }})
        })
    }
    getUser = async () => {
        const userData = auth().currentUser;
        const userDocument = await firestore().collection('Test').doc(userData.uid).collection('Appointments').doc(userData.uid).get()
    }

    dateCheck = async () => {
        const upcomingAppointment = new Date(this.state.Appointments.upcoming)
        const dateToday = new Date()
        if (dateToday.getTime() > upcomingAppointment.getTime()) {
            await firestore().collection('Test').doc(userData.uid).collection('Appointments').doc(userData.uid).update({'previous': upcomingAppointment, 'upcoming': ''})
        }
    }

    render() {
        return (
            <><Card containerStyle={{ flex: 2, borderRadius: 15 }}>
                <Card.Title style={{ fontSize: 15 }}> Upcoming Appointment </Card.Title>
                <Card.Divider />
                <Text> Date: {this.state.Appointments.upcoming} </Text>
                <Text> Time: {this.state.Appointments?.time} </Text>
                <Text> Price: {this.state.Appointments.price} </Text>
                <Text> Barber: {this.state.Appointments.barber} </Text>
            </Card>
            <Card containerStyle={{ flex: 2, borderRadius: 15 }}>
                <Card.Title style={{ fontSize: 15 }}> Previous Appointment </Card.Title>
                <Card.Divider />
                <Text> Date: {this.state.Appointments.previous} </Text>
            </Card></>
        )
    }
}

export default UserAppointmentsUtil
