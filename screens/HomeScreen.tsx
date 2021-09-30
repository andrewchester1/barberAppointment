import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import FirebaseApp from '../FirebaseApp';
import FirebaseUtil from '../utils/FirebaseUtil';
import FirestoreUtil from '../utils/FirestoreUtil';
import { LoginContext } from '../utils/LoginProvider';

const HomeScreen = () => {
    const { user } = useContext(LoginContext);
    const signOut = () => {FirebaseUtil.signOut().catch((e) => {
        console.log(e)
        alert('Something went wrong')
    })}
    return(
        <View style={styles.container}>
            <FirebaseApp />
            <Button onPress={()=> signOut()} title='Logout'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignContent: 'center',
      padding: 20
    }
  });

export default HomeScreen