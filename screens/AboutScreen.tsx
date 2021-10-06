import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements'
import FirebaseUtil from '../utils/FirebaseUtil';
import FirestoreUtil from '../utils/FirestoreUtil';
import { LoginContext } from '../utils/LoginProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const HomeScreen = () => {
    const { user } = useContext(LoginContext);

    const Tab = createBottomTabNavigator();

    return(
        <View style={styles.container}>
            <Card containerStyle={{ flex: 1, borderRadius: 15}}>
                <Card.Title style={{ fontSize: 15}}> Nate </Card.Title>
                <Card.Divider/>
                    <Text> Price: </Text>
                    <Text> Location: </Text>
                    <Text> Phone: </Text>
                    <Text> Instagram: </Text>
                    <Text> Website: </Text>
            </Card>
            <Card containerStyle={{ flex: 2, borderRadius: 15}}>
                <Card.Title style={{ fontSize: 15}}> Haircut Pictures </Card.Title>
                <Card.Divider/>
                    <Text> Account Details/Image </Text>
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