import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import { LoginContext } from '../../utils/LoginProvider';
import firestore from '@react-native-firebase/firestore'
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

const AdminEditProfileScreen = () => {
    const { user } = useContext(LoginContext);
    const [barberProfile, setBarberProfile] = useState({})
    const [changeData, setChangeData] = useState('')
    const [barberDataType, setBarberDataType] = useState('')
    const [newBarberData, setNewBarberData] = useState('')

      const getBarberProfil = async () => {
        const data = await firestore()
        .collection('Barber')
        .doc('Nate')
        .get()
        setBarberProfile({...data.data()})
      }

      const changeBarberData = (onekey) => {
        setChangeData(onekey[1].toString()),
        setBarberDataType(onekey[0].toLowerCase())
      }

      const setBarberData = () => {
        const barberData = {
            [barberDataType]: newBarberData
        }
        firestore()
        .collection('Barber')
        .doc('Nate')
        .set(barberData, {merge: true})
        .then(() => {
          Alert.alert('Success', 'Data has been changed')
        })
        .catch((error) => {
          console.log('Error updating the document: ', error)
          alert('Something went wrong try again')
      }); 
      }

      useEffect(() => {
        getBarberProfil()
      }, [])

    return(
        <View style={styles.container}>
          <ScrollView>
            { changeData != '' ?
                <View>
                <><TextInput
                    placeholder={changeData.toString()}
                    onChangeText={setNewBarberData}
                    value={newBarberData}
                    style={styles.textInput} />
                    <Button title={`Change ${barberDataType}: ${changeData}`} onPress={() => setBarberData()}/>
                </>
            </View>
            : <Text></Text>
            } 
            { Object.entries(barberProfile).map((onekey, i) => (
                <ListItem bottomDivider onPress={() => changeBarberData(onekey)} >
                    <ListItem.Content>
                        <ListItem.Title key={i}> {onekey[0]}: {onekey[1]} </ListItem.Title>
                    </ListItem.Content>
                </ListItem>
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
    },
    textInput: {
      borderWidth: 1,
      borderColor: 'grey',
      padding: 10,
      marginBottom: 20,
      borderRadius: 5,
  },
  });

export default AdminEditProfileScreen