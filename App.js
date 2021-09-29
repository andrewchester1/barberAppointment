import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import firebase from '@react-native-firebase/app';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import AppStack from './AppStack';
import LoginProvider from './utils/LoginProvider';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu',
});

const firebaseCredentials = Platform.select({
  ios: 'https://invertase.link/firebase-ios',
  android: 'https://invertase.link/firebase-android',
});


export default function App() {
  return (
    <View style={styles.container}>
      <LoginProvider>
        <AppStack />
      </LoginProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
