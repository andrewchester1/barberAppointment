import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Card } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'
import moment from 'moment';
import CalendarStrip from 'react-native-calendar-strip'

class UserName extends Component {
    constructor(props) {
        super(props);
        let startDate = moment(); 
        this.state = {
          selectedDate: moment(),
          startDate,
        };
      }
    
      onDateSelected = selectedDate => {
        this.setState({ selectedDate });
        this.setState({ formattedDate: selectedDate.format('YYYY-MM-DD')});
      }
    
      render() {
        return (
          <View style={{flex: 1}}>
            <CalendarStrip
              scrollable
              style={{height:100, paddingTop: 10, paddingBottom: 10}}
              calendarHeaderStyle={{color: 'white'}}
              calendarColor={'grey'}
              dateNumberStyle={{color: 'white'}}
              dateNameStyle={{color: 'white'}}
              iconContainer={{flex: 0.1}}
              customDatesStyles={this.state.customDatesStyles}
              highlightDateNameStyle={{color: 'white'}}
              highlightDateNumberStyle={{fontWeight: 'bold', color: 'white'}}
              highlightDateContainerStyle={{backgroundColor: 'black'}}
              selectedDate={this.state.selectedDate}
              onDateSelected={this.onDateSelected}
            />
    
            <Text style={{fontSize: 15, alignSelf: 'center'}}>Selected Date: {this.state.formattedDate}</Text>
            
          </View>
        );
      }
    }

    export default UserName