import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements'
import firestore from '@react-native-firebase/firestore'

const HomeScreen = () => {
    const [barberData, setBarberData] = useState({'Tuesday': '', 'Wednesday': '', 'Thursday': '',  'Friday': '', 'Saturday': '', 'instagram': '', 'location': '', 'name': '', 'phone': '', 'price': '', 'website': '' });

    async function getBarberData() {
        await firestore().collection('Barber').doc('Nate').get().then((barber) => {
            setBarberData({...barberData, ...barber.data()})
        })
    }

    useEffect(() => {
        getBarberData()
        }, [])

    return(
        <View style={styles.container}>
            <Card containerStyle={{ flex: 1, margin: 0 }}>
                <Card.Title style={{ fontSize: 15}}> {barberData.name} </Card.Title>
                <Card.Divider/>
                    <Text>What does Nate want here?</Text>
            </Card>
            <ScrollView>
                <Card containerStyle={{ flex: 2.5, borderRadius: 15}}>
                    <Card.Title style={{ fontSize: 15, textAlign:'left'}}> INFO </Card.Title>
                        <Text> {barberData.price} </Text>
                        <Text> {barberData.phone} </Text>
                        <Text> {barberData.instagram} </Text>
                        <Text> {barberData.website} </Text>
                    <Text></Text>
                    <Card.Title style={{ fontSize: 15, textAlign:'left'}}> ADDRESS & HOURS </Card.Title>
                        <Text> {barberData.location} </Text>
                        <Text> Tuesday: {barberData.Tuesday} </Text>
                        <Text> Wednesday: {barberData.Wednesday} </Text>
                        <Text> Thursday: {barberData.Thursday} </Text>
                        <Text> Friday: {barberData.Friday} </Text>
                        <Text> Saturday: {barberData.Saturday} </Text>
                </Card>
                <Card containerStyle={{ flex: 1, margin: 0, marginTop: 10 }}>
                    <Card.Title style={{ fontSize: 15, textAlign:'left'}}> Haircut Pictures </Card.Title>
                    <Card.Divider/>
                        <Text> Haircut Pictures </Text>
                </Card>
            </ScrollView>
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