import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment from 'moment';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  render() {
    const { selectedStartDate } = this.state;
    const selectedDate = selectedStartDate ? selectedStartDate.toString() : '';
    const today = moment()
    let minDate = new Date()
    let maxDate = today.add(30, 'day');
    return (
      <View style={{flex: 1}}>
        <CalendarPicker
            minDate={minDate}
            maxDate={maxDate}
            onDateChange={this.onDateChange}
        />

        <View>
          <Text>Selected Date:{ selectedDate }</Text>
        </View>
      </View>
    );
  }
}