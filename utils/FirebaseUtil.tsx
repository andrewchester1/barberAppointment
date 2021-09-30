import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export default class FirebaseUtil {
    public static signIn = (email: string, password: string) => {
        return auth().signInWithEmailAndPassword(email, password);
    }
    public static signUp = (email: string, password: string) => {
        return auth().createUserWithEmailAndPassword(email, password);
    }
    public static signOut = () => {
        return auth().signOut();
    }
    // public static onRegister = async (email: string, password: string) => {
    //     try {
    //         const credential = await auth().createUserWithEmailAndPassword(email, password);
    //         const {uid} = credential
    //         const user = {
    //             email: email,
    //             password: password,
    //             user_id: uid,
    //             name: name,
    //             phone: phone,
    //         };
    //         await firestore().collection('users').doc(uid).set(user);
    //     } catch {

    //     }
        
    // }
}