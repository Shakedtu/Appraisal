import firebase from 'firebase';
import config from '../../firebaseConfig.json';

firebase.initializeApp(config);
export class FirebaseAdapter {
  private fireStore;
  constructor() {
    this.fireStore = firebase.firestore();
  }

  async addUser(
    userData = {
      first: 'Shak',
      last: 'Attack',
      born: 1816,
    }
  ) {
    try {
      const docRef = await this.fireStore.collection('users').add(userData);
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.log(e);
    }
  }
}
