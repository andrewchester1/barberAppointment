import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Button, Text } from 'react-native'
import FirebaseUtil from '../utils/FirebaseUtil';
  
const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [create, setCreate] = useState(false);

    const signIn = () => {FirebaseUtil.signIn(email, password).catch((e) => {
        console.log(e)
        alert('Email/Password is incorrect')
    })};
    const signUp = () => {FirebaseUtil.signUp(email, password).catch((e) => {
        console.log(e)
        alert('Something went wrong')
    })};

    return (
        <View style={styles.container}>
            <TextInput 
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                style={styles.textInput} 
            />
            <TextInput 
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                style={styles.textInput} 
                secureTextEntry={true} 
            />
            {create ? (
                <>
                    <Button title='Sign Up' onPress={() => signUp()} />
                    <Text style={styles.text} onPress={() => setCreate(false)}>
                        Create an Account
                    </Text>
                </>
            ) : (
                <>
                    <Button title='Sign In' onPress={() => signIn()} />
                    <Text style={styles.text} onPress={() => setCreate(true)}>
                        Sign in
                    </Text>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#fff',
      padding: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    text: {
        color: 'blue',
        marginTop: 20,
    },
  });

  export default LoginScreen;