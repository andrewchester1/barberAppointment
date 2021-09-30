import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';

class FirebaseApp extends Component {
    state = {
        Test: {
            Name: ""
        }
    }
    constructor(props) {
        super(props);
        this.getUser();
        this.subscriber = firestore().collection("Test").doc
        ('WCsBigwGq8EKLFbV1oFc').onSnapshot(doc => {
            this.setState({
                Test: {
                    Name: doc.data().Name
            }})
        })
    }
    getUser = async () => {
        const userDocument = await firestore().collection("Test").doc('WCsBigwGq8EKLFbV1oFc').get()
        console.log(userDocument)
    }
    render() {
        return (
            <View>
                <Text>FirebaseApp: {this.state.Test.Name} </Text>
            </View>
        )
    }
}

export default FirebaseApp