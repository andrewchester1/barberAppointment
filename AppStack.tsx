import React, { useContext } from "react";
import { createNativeStackNavigator  } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'
import { LoginContext } from "./utils/LoginProvider";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import FirebaseApp from "./FirebaseApp";

const Stack = createNativeStackNavigator ();
export default function AppStack() {
    const { user, isLoading } = useContext(LoginContext);
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoading ? ( 
                    <Stack.Screen name="loading" options={{ headerShown: false}} component={LoadingScreen}/> 
                ): user ? (
                <Stack.Screen name="Home" component={HomeScreen}/> 
                ) : (
                <Stack.Screen name="signin" component={LoginScreen}/>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}