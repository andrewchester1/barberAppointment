import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

class AppointmentTimes extends Component {
    state = {
        time: {},
        final: {}
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
            final: {}
        };
    }
    
    componentDidMount() {
        firestore().collection("Oct").doc
        ('10-03-2021').onSnapshot(doc => {
            this.setState({ time: doc.data() })
            this.setState({ final: {...this.AppoitnmentTime, ...this.state.time}})
            console.log('this.state.time', this.state.final)
        }); 
    }
    // scheduleAppoint = async () => {
    //     await firestore().collection("Calendar").doc(selectedMonth).collection(selectedTime).doc(userName).set(appointmentData)
    // }

    render() {
        return (
            <Card containerStyle={{ flex: 1, borderRadius: 15 }}>
                <Card.Title style={{ fontSize: 15}}> Avaliable Times </Card.Title>
                <Card.Divider/>
                    { 
                        Object.entries(this.state.final).map((onekey, i) => {
                            return (
                                <Text style={{flexDirection: 'row'}} key={i}>{onekey[1] ? null : onekey[0]} {console.log('[onekey]: ', onekey[1])} </Text>
                            )
                        })
                    }
            </Card>
        )
    }
}

export default AppointmentTimes