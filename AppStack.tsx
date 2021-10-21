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
import AdminProvider from "./utils/AdminProvider";

const Tab = createBottomTabNavigator()

async function AdminProviders() { 
    let admin
    await FirestoreUserNameUtil.getUserName().then((userData) => {
        admin = userData.data().admin
        console.log('admin', admin)
    })
    return admin
}

function MainStackNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' options={{ title: 'Home', headerTitleAlign: 'center' }} component={HomeScreen} />
            <Tab.Screen name='Appointment' options={{ title: 'Appointment', headerTitleAlign: 'center' }} component={AppointmentScreen} />
            <Tab.Screen name='About' options={{ title: 'Nate', headerTitleAlign: 'center' }} component={AboutScreen} />
            <Tab.Screen name='Settings' options={{ title: 'Settings', headerTitleAlign: 'center' }} component={SettingsScreen} />
        </Tab.Navigator>
    )
}

function MainAdminStackNavigator() {
    return (
        <Tab.Navigator>
                <Tab.Screen name='About' options={{ title: 'Nate', headerTitleAlign: 'center' }} component={AboutScreen} />
                <Tab.Screen name='Add Appointments' options={{ title: 'Add Appointments', headerTitleAlign: 'center' }} component={AdminAddAppointmentScreen} />
                <Tab.Screen name='Calendar' options={{ title: 'Calendar', headerTitleAlign: 'center' }} component={AdminCalendarScreen} />
                <Tab.Screen name='Admin' options={{ title: 'Admin', headerTitleAlign: 'center' }} component={AdminScreen} />
        </Tab.Navigator>
    )
}


const Stack = createNativeStackNavigator();

export default function AppStack() {
    const { user, isLoading } = useContext(LoginContext);
    let admin = AdminProvider()
    console.log('adminTest', admin)
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoading ? ( 
                    <Stack.Screen name="loading" options={{ headerShown: false}} component={LoadingScreen}/> 
                ): user && admin == true ? (
                    <Stack.Screen name="MainAdminStackNavigator" options={{ headerShown: false }} component={MainAdminStackNavigator} />
                ): user && admin != true ? (
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
