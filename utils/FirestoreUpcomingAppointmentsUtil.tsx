import React, { Component } from 'react';
import { View, Text, ScrollView, Button, ActivityIndicator } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

export default class FirestoreUpcomingAppointmentsUtil {
    public static getAppointmentInfo = async () => {  
        const userData = auth().currentUser;
        const appointmentData = await firestore().collection("Test").doc(userData.uid).collection('Appointments').doc
        (userData.uid).get();
        console.log('appointmentData: ', appointmentData)
        return appointmentData
    }
}