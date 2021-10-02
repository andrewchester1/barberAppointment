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
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Home') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline';
              } else if (route.name === 'About') {
                iconName = focused ? 'ios-list-box' : 'ios-list';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
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