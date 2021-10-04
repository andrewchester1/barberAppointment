import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';
import { get } from 'core-js/core/dict';

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
            final: {},
            selectedStartDate: null,
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date) {
        this.setState({
          selectedStartDate: date,
        });
        this.getData()
      }
    
    getData() {
        firestore().collection("Oct").doc
        (moment(this.state.selectedStartDate).format('YYYY-MM-DD').toString()).onSnapshot(doc => {
            this.setState({ time: doc.data() })
            this.setState({ final: {...this.AppoitnmentTime, ...this.state.time}})
            console.log('this.state.time', this.state.final)
            console.log('onDateChange: ', (moment(this.state.selectedStartDate).format('YYYY-MM-DD').toString()))
            console.log('Dataaaaa: ', this.state.selectedStartDate)
        }); 
    }
    // scheduleAppoint = async () => {
    //     await firestore().collection("Calendar").doc(selectedMonth).collection(selectedTime).doc(userName).set(appointmentData)
    // }

    render() {
        const { selectedStartDate } = this.state;
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
                <ScrollView style={{ borderColor: 'black', borderRadius: 15}}>
                {
                    Object.entries(this.state.final).map((onekey, i) => (
                        <ListItem key={i} bottomDivider numColumns={2}>
                            <ListItem.Content>
                                <ListItem.Title>{onekey[1] ? null : onekey[0]}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    ))
                }
                </ScrollView >
            </View></>
        )
    }
}

export default AppointmentTimes