import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
            <View>
                <Text>FirebaseApp: {this.state.Test.name} </Text>
            </View>
        )
    }
}

export default FirebaseApp