import React, { Component } from 'react';
import { View, Text, ScrollView, Button, ActivityIndicator } from 'react-native';
import { Card, ListItem } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

export default class FirestoreDeleteDocUtil {
    public static deleteDoc = async (collection, doc) => {  
        return firestore()
        .collection(collection)
        .doc(doc)
        .delete()
        .then(() => {
            console.log('User deleted!');
        });
    }
}