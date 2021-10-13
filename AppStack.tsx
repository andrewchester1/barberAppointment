import React, { useContext } from "react";
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import { LoginContext } from "./utils/LoginProvider";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import AppointmentScreen from "./screens/AppointmentScreen";
import AboutScreen from "./screens/AboutScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FirestoreUserNameUtil from "./utils/FireStoreUserNameUtil";
import AdminScreen from "./screens/AdminScreen";
import EditAccountScreen from "./screens/EditAccountScreen";
import { Button } from "react-native";

const Tab = createBottomTabNavigator()

function isAdmin() {
    let admin
    FirestoreUserNameUtil.getUserName().then((userData) => {
        admin = userData.data().admin
        
    })
    return admin
}

function MainStackNavigator() {
    const admin = isAdmin()
    return (
        <Tab.Navigator>
            { admin ?
                <>
                    <Tab.Screen name='Home' component={HomeScreen} />
                    <Tab.Screen name='Appointment' component={AppointmentScreen} />
                    <Tab.Screen name='About' component={AboutScreen} />
                    <Tab.Screen name='Settings' component={SettingsScreen} />
                </> :
                <>
                    <Tab.Screen name='About' component={AboutScreen} />
                    <Tab.Screen name='Admin' component={AdminScreen} />
                </>
            } 
        </Tab.Navigator>
    )
}


const Stack = createNativeStackNavigator();

export default function AppStack() {
    const { user, isLoading } = useContext(LoginContext);
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoading ? ( 
                    <Stack.Screen name="loading" options={{ headerShown: false}} component={LoadingScreen}/> 
                ): user ? (
                <>
                <Stack.Screen name="Home" options={{ headerShown: false }} component={MainStackNavigator} />
                <Stack.Screen
                    name="EditAccountScreen"
                    component={EditAccountScreen}/>
                </>
                ) : (
                <Stack.Screen name="Sign In" component={LoginScreen}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}