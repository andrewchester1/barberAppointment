import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements'
import FirebaseUtil from '../utils/FirebaseUtil';
import FirestoreUtil from '../utils/FirestoreUtil';
import { LoginContext } from '../utils/LoginProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FirestoreBarberInfoUtil from '../utils/FirestoreBarberInfoUtil';

const HomeScreen = () => {
    const { user } = useContext(LoginContext);
    const [barberInfo, setBarberInfo] = useState({});
    const [baberName, setBarberName] = useState();
    const [barberAddress, setBarberAddress] = useState({});

    function getBarberInfo() {
        FirestoreBarberInfoUtil.getBarberInfo().then((testData) => {
            const barberData = {
                Price: testData.data().price,
                Phone: testData.data().phone,
                Instagram: testData.data().instagram,
                Website: testData.data().website
            };
            const barberAddressAndHours = {
                Address: testData.data().location,
                Tuesday: testData.data().Tuesday,
                Wednesday: testData.data().Wednesday,
                Thursday: testData.data().Thursday,
                Friday: testData.data().Friday,
                Saturday: testData.data().Saturday,
            }
            const barberName = testData.data().name
            
            setBarberInfo(barberData)
            setBarberAddress(barberAddressAndHours)
            setBarberName(barberName)
            console.log('barberData: ', barberData);
            return barberData;
            // console.log(e)
        });
    }

    useEffect(() => {
        getBarberInfo()
        }, [])
    
        console.log('getBarberInfo', barberInfo)

    return(
        <View style={styles.container}>
            <Card containerStyle={{ flex: 1, margin: 0 }}>
                <Card.Title style={{ fontSize: 15}}> {baberName} </Card.Title>
                <Card.Divider/>
                    <Text>What does Nate want here?</Text>
            </Card>
            <Card containerStyle={{ flex: 2.5, borderRadius: 15}}>
                <Card.Title style={{ fontSize: 15, textAlign:'left'}}> INFO </Card.Title>
                { Object.entries(barberInfo).map((onekey, i) => (
                    <>
                        <Text key={i}> {onekey[0]}: {onekey[1]} </Text>
                    </>
                ))}
                <Text></Text>
                <Card.Title style={{ fontSize: 15, textAlign:'left'}}> ADDRESS & HOURS </Card.Title>
                { Object.entries(barberAddress).map((onekey, i) => (
                    <>
                        <Text key={i}> {onekey[0] == "Address" ? null : `${onekey[0]}:`} {onekey[1]} </Text>
                    </>
                ))}
            </Card>
            <Card containerStyle={{ flex: 1, margin: 0, marginTop: 10 }}>
                <Card.Title style={{ fontSize: 15, textAlign:'left'}}> Haircut Pictures </Card.Title>
                <Card.Divider/>
                    <Text> Haircut Pictures </Text>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    }
  });

export default HomeScreen