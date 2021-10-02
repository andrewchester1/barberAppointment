import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import FirebaseApp from '../FirebaseApp';
import FirebaseUtil from '../utils/FirebaseUtil';
import FirestoreUtil from '../utils/FirestoreUtil';
import { LoginContext } from '../utils/LoginProvider';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './LoginScreen';
import AboutScreen from './AboutScreen';

const HomeScreen = () => {
    const { user } = useContext(LoginContext);
    const signOut = () => {FirebaseUtil.signOut().catch((e) => {
        console.log(e)
        alert('Something went wrong')
    })}

    const Tab = createBottomTabNavigator();

    return(
        <View style={styles.container}>
            <View style={styles.box}>
                <FirebaseApp />
            </View>
            <View style={styles.box}>
                <Text>Item 2</Text>
            </View>
            <View style={styles.box}>
                <Text>Item 3</Text>
                <Button onPress={() => signOut()} title='Logout' />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: '#fff',
      justifyContent: 'center',
      alignContent: 'center',
      padding: 20,
    },
    box: {
        flex: 1,
        backgroundColor: "grey",
        padding: 20,
      }
  });

export default HomeScreen