import React, { useContext } from "react";
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import { LoginContext } from "./utils/LoginProvider";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import FirebaseApp from "./FirebaseApp";
import AboutScreen from "./screens/AboutScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator()

function MainStackNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='About' component={AboutScreen} />
        </Tab.Navigator>
    )
}
const Stack = createNativeStackNavigator ();

export default function AppStack() {
    const { user, isLoading } = useContext(LoginContext);
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoading ? ( 
                    <Stack.Screen name="loading" options={{ headerShown: false}} component={LoadingScreen}/> 
                ): user ? (
                <Stack.Screen name="Home" options={{ headerShown: false}} component={MainStackNavigator} /> 
                ) : (
                <Stack.Screen name="signin" component={LoginScreen}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}