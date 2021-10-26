import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { firebase } from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import FirestoreDeleteDocUtil from '../../utils/FirestoreDeleteDocUtil';

const EditAccountScreen = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState([]);

    async function getUsers() {
        const snapshot = await firebase.firestore().collection('Test').get()
        const data = snapshot.docs.map(doc => doc.data());
        setUserInfo(data)
    }

    const deleteUser = (user_id: any) => {FirestoreDeleteDocUtil.deleteDoc('Test', user_id).catch((e) => {
        alert('Unable to sign out try again.')
    })}

    useEffect(() => {
        getUsers()
        }, [])

    return(
        <View style={styles.container}>
            <ScrollView>
                { userInfo &&
                    userInfo.map((onekey, i) => (
                        <><ListItem bottomDivider key={i} onPress={() => Alert.alert('Delete', `Are you sure you want to delete ${"\n"}Account Name: ${onekey.name ? onekey.name : 'N/A'} ${"\n"}Account Id: ${onekey.user_id ? onekey.user_id : 'N/A'}`, 
                        [
                            {
                              text: "Cancel"
                            },
                            { text: "Delete User", onPress: () => (deleteUser(onekey.user_id)) }
                          ]) }>
                            <ListItem.Content>
                                <ListItem.Title style={{ fontWeight: 'bold', textAlign: 'center', alignSelf: 'center'}} key={i}>Name: {onekey.name} </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title key={i}> User Id: {onekey.user_id ? onekey.user_id : 'N/A'} </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title key={i}> Phone: {onekey.phone ? onekey.phone : 'N/A'} </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem bottomDivider onPress={() => navigation.navigate('Points', {
                            name: onekey.name,
                            userId: onekey.user_id,
                            goatPoints: onekey.points,
                        })}>
                            <ListItem.Content>
                                <ListItem.Title key={i}> Goat Points: {onekey.points ? onekey.points : 'N/A'} </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title key={i}> Referral: {onekey.referral ? onekey.referral : 'N/A'} </ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        </>
                        
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignContent: 'center',
      padding: 10
    }
  });

export default EditAccountScreen