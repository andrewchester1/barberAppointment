import React from "react";
import firestore from '@react-native-firebase/firestore';

export default function FirestoreUtil() {
    const state = {
        Test: {
            Name: ""
        }
    }
    // const getUser = async () => {
    //     const userDocument = await firestore().collection("Test").doc('WCsBigwGq8EKLFbV1oFc').get()
    //     console.log(userDocument)
    //     console.log('state: ', this.state.Test.Name)
    //     return this.state.Test.Name
    // }
}
