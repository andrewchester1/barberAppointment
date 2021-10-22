import React, { useEffect, useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import FirebaseUtil from "../../utils/FirebaseUtil";
import FirestoreUserNameUtil from "../../utils/FireStoreUserNameUtil";
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const AdminScreen = ({navigation}) => {
    const [userInfo, setUserInfo] = useState({});
    const [changeUserInfo, setChangeUserInfo] = useState();
    const [newUserInfo, setNewUserInfo] = useState('');
    const [userDataType, setUserDataType] = useState('');
    
    const signOut = () => {FirebaseUtil.signOut().catch((e) => {
        console.log(e)
        alert('Unable to sign out try again.')
    })}

    const changeInfo = (onekey) => {
        setChangeUserInfo(onekey[1])
        setUserDataType(onekey[0].toLowerCase())
    }

    const setUserData = (newUserInfo) => {
        const updateUserData = {
            [`${userDataType}`] : newUserInfo
        }
        const userData = auth().currentUser;
        firestore().collection('Test').doc(userData.uid).update(updateUserData);
    }

    function getUserData() {
        FirestoreUserNameUtil.getUserName().then((userData) => {
            const userInfo = {
                Name: userData.data().name,
                Phone: userData.data().phone,
            };
            setUserInfo(userInfo)
        });
    }

    useEffect(() => {
        getUserData()
        }, [])

    return(
        <View style={styles.container}>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: 'bold', alignSelf: 'center' }}>My Account Detials</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            { changeUserInfo &&
                <View>
                    <><TextInput
                        placeholder={changeUserInfo}
                        onChangeText={setNewUserInfo}
                        value={newUserInfo}
                        style={styles.textInput} />
                        <Button title="Change Information" onPress={() => setUserData(newUserInfo)}/>
                    </>
                </View>
            }
            { Object.entries(userInfo).map((onekey, settingsInfo) => (
                <ListItem bottomDivider onPress={() => changeInfo(onekey)} >
                    <ListItem.Content>
                        <ListItem.Title key={settingsInfo}> {onekey[0]}: {onekey[1]} </ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            ))}
            <ListItem bottomDivider onPress={() => navigation.navigate('EditAccountScreen')}>
                <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: 'bold' }}>View Clients</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: 'bold' }}>Change Password</ListItem.Title>
                </ListItem.Content>
            </ListItem>
            <ListItem bottomDivider onPress={() => signOut()}>
                <ListItem.Content>
                    <ListItem.Title style={{ fontWeight: 'bold', alignSelf: 'center' }}>Sign Out</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      alignContent: 'flex-start',
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
  });

export default AdminScreen