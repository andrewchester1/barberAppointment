import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'

class FirebaseApp extends Component {
    state = {
        Test: {
            name: "",
            email: "",
            phone: ""
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
                    name: doc.data().name,
                    email: doc.data().email,
                    phone: doc.data().phone
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
                    <Text> Email: {this.state.Test.email} </Text>
                    <Text> Phone: {this.state.Test.phone} </Text>
            </Card>
        )
    }
}

export default FirebaseApp