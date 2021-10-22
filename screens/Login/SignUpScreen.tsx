import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Button, Text } from 'react-native'
import FirebaseUtil from '../../utils/FirebaseUtil';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [referral, setReferral] = useState('')

    const signUp = () => {FirebaseUtil.signUp(email, password, phone, name, referral).catch((e) => {
        console.log(e)
        alert('Something went wrong')
    })};
    return(
        <View style={styles.container}>
            <TextInput 
                placeholder="Name"
                onChangeText={setName}
                value={name}
                style={styles.textInput}
            />
            <TextInput 
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                style={styles.textInput} 
            />
            <TextInput 
                placeholder="Phone"
                onChangeText={setPhone}
                value={phone}
                style={styles.textInput} 
            />
            <TextInput 
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                style={styles.textInput} 
                secureTextEntry={true} 
            />
            <Text>If someone referred you, enter their name</Text>
            <TextInput 
                placeholder="Referral"
                onChangeText={setReferral}
                value={referral}
                style={styles.textInput}
            />
            <Button title='Sign Up' onPress={() => signUp()} />
        </View>
    )
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