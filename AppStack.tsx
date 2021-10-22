import React, { useContext, useState } from "react";
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import { LoginContext } from "./utils/LoginProvider";
import LoadingScreen from "./screens/Login/LoadingScreen";
import LoginScreen from "./screens/Login/LoginScreen";
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
import AdminAddPoints from "./screens/Admin/AdminAddPoints";
import { View, Button, Text } from "react-native";
import SignUpScreen from "./screens/Login/SignUpScreen";

const Tab = createBottomTabNavigator()

const AdminCalendarStack = createNativeStackNavigator();

function AdminCalendarStackScreen({ navigation }) {
    return (
        <AdminCalendarStack.Navigator>
            <AdminCalendarStack.Screen name="Admin Calendar" 
            component={AdminCalendarScreen} 
            options={{ title: 'Calendar', headerTitleAlign: 'center', headerRight: () => (
                <Button
                  onPress={() => navigation.navigate('AdminAddAppointmentScreen')}
                  title="Add"
                  color="black"
                />
              ),}}/>
            <AdminCalendarStack.Screen name="AdminAddAppointmentScreen" options={{ title: 'Add Appointments', headerTitleAlign: 'center' }} component={AdminAddAppointmentScreen} />
        </AdminCalendarStack.Navigator>
    )
}

const AdminSettingsStack = createNativeStackNavigator();

function AdminSettingsStackScreen() {
    return (
        <AdminSettingsStack.Navigator>
            <AdminSettingsStack.Screen name="Admin Settings" options={{ title: 'Admin Settings', headerTitleAlign: 'center' }} component={AdminScreen}/>
            <AdminSettingsStack.Screen name="EditAccountScreen" options={{ title: 'Edit Accounts', headerTitleAlign: 'center' }} component={EditAccountScreen} />
            <AdminSettingsStack.Screen name="Points" options={{ title: 'Points', headerTitleAlign: 'center' }} component={AdminAddPoints} />
        </AdminSettingsStack.Navigator>
    )
}

const AdminAboutStack = createNativeStackNavigator();

function AdminAdminStackScreen({ navigation }) {
    return (
        <AdminAboutStack.Navigator>
            <AdminAboutStack.Screen name="Nate" options={{ title: 'Nate', headerTitleAlign: 'center',
                headerRight: () => (
                    <Button
                    onPress={() => navigation.navigate('Edit Profile')}
                    title="Edit"
                    color="black"
                    />
                ),}} component={AboutScreen}/>
            <AdminAboutStack.Screen name="Edit Profile" options={{ title: 'Edit Profile', headerTitleAlign: 'center' }} component={AdminEditProfileScreen}/>
        </AdminAboutStack.Navigator>
    )
}

const LoginSreenStack = createNativeStackNavigator();

function LoginStackScreen({ navigation }) {
    return (
        <LoginSreenStack.Navigator>
            <LoginSreenStack.Screen name="Sign In" options={{ title: 'Sign In', headerTitleAlign: 'center',
                headerRight: () => (
                    <Button
                    onPress={() => navigation.navigate('Sign Up')}
                    title="Edit"
                    color="black"
                    />
                ),}} component={LoginScreen}/>
            <LoginSreenStack.Screen name="Sign Up" options={{ title: 'Create Account', headerTitleAlign: 'center' }} component={SignUpScreen}/>
        </LoginSreenStack.Navigator>
    )
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
                <Tab.Screen name='About' options={{ headerShown: false}} component={AdminAdminStackScreen} />
                <Tab.Screen name='Calendar' options={{ headerShown: false }} component={AdminCalendarStackScreen} />
                <Tab.Screen name='Admin' options={{ headerShown: false}} component={AdminSettingsStackScreen} />
        </Tab.Navigator>
    )
}


const Stack = createNativeStackNavigator();

export default function AppStack() {
    const { user, isLoading } = useContext(LoginContext);
    let admin = AdminProvider()
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoading ? ( 
                    <Stack.Screen name="loading" options={{ headerShown: false}} component={LoadingScreen}/> 
                ): user && admin == true ? (
                    <><Stack.Screen name="MainAdminStackNavigator" options={{ headerShown: false }} component={MainAdminStackNavigator} />
                    <Stack.Screen
                            name="EditAccountScreen"
                            component={EditAccountScreen} />
                    <Stack.Screen name='AdminEditProfileScreen' component={AdminEditProfileScreen} /></>
                ): user && admin != true ? (
                    <Stack.Screen name="Home" options={{ headerShown: false }} component={MainStackNavigator} />
                ) : (
                    <Stack.Screen name="Sign In" options={{ headerShown: false }} component={LoginStackScreen}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
