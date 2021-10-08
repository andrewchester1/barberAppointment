import React, { Component } from 'react';
import { View, Text, ScrollView, Button, ActivityIndicator } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

export default class FirestoreBarberInfoUtil {
    public static getBarberInfo = async () => {  
        const testData = await firestore().collection('Barber').doc('Nate').get();
        console.log('testData: ', testData)
        return testData
    }
}