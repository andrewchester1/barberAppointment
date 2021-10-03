import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

class FirebaseApp extends Component {
    state = {
        Test: {
            name: ""
        }
    }
    constructor(props) {
        super(props);
        this.getUser();
        const userData = auth().currentUser;
        this.subscriber = firestore().collection("Test").doc
        (userData.uid).onSnapshot(doc => {
            this.setState({
                Test: {
                    name: doc.data().name
            }})
        })
    }
    getUser = async () => {
        const userData = auth().currentUser;
        const userDocument = await firestore().collection("Test").doc(userData.uid).get()
    }
    render() {
        return (
            <Card containerStyle={{ flex: 2, borderRadius: 15}}>
                <Card.Title style={{ fontSize: 15}}> Account Name: {this.state.Test.name} </Card.Title>
                <Card.Divider/>
                    <Text> Account Details/Image </Text>
            </Card>
        )
    }
}

export default FirebaseApp