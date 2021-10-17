import firestore from '@react-native-firebase/firestore';

export default class FirestoreDeleteDocUtil {
    public static deleteDoc = async (collection, doc) => {  
        return firestore()
        .collection(collection)
        .doc(doc)
        .delete()
        .then(() => {
            console.log('User deleted!');
        });
    }
}