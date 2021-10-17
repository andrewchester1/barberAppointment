import React, { useContext, useState } from "react";
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import { LoginContext } from "./utils/LoginProvider";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/Client/HomeScreen";
import AppointmentScreen from "./screens/Client/AppointmentScreen";
import AboutScreen from "./screens/Client/AboutScreen";
import SettingsScreen from "./screens/Client/SettingsScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FirestoreUserNameUtil from "./utils/FireStoreUserNameUtil";
import AdminScreen from "./screens/Admin/AdminSettingScreen";
import EditAccountScreen from "./screens/Admin/AdminEditAccountScreen";
import AdminCalendarScreen from "./screens/Admin/AdminCalendarScreen";
import AdminAddAppointmentScreen from "./screens/Admin/AdminAddAppointmentScreen"
import AdminEditProfileScreen from "./screens/Admin/AdminEditProfileScreen";

const Tab = createBottomTabNavigator()

let admin

function isAdmin() {
    FirestoreUserNameUtil.getUserName().then((userData) => {
        admin = userData.data().admin
        
    })
}

function MainStackNavigator() {
    isAdmin()
    return (
        <Tab.Navigator>
            { admin == undefined || admin == false ?
                <>
                    <Tab.Screen name='Home' component={HomeScreen} />
                    <Tab.Screen name='Appointment' component={AppointmentScreen} />
                    <Tab.Screen name='About' component={AboutScreen} />
                    <Tab.Screen name='Settings' component={SettingsScreen} />
                </> :
                <>
                    <Tab.Screen name='About' component={AboutScreen} />
                    <Tab.Screen name='Add Appointments' component={AdminAddAppointmentScreen} />
                    <Tab.Screen name='Calendar' component={AdminCalendarScreen} />
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
                <Stack.Screen name='AdminEditProfileScreen' component={AdminEditProfileScreen} />
                </>
                ) : (
                <Stack.Screen name="Sign In" component={LoginScreen}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
