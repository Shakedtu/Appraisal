const firebase = require('firebase');
require('firebase/firestore');
const config = require('../../firebaseConfig.json');

class FirebaseAdapter {
  private fireStore;
  constructor() {
    firebase.initializeApp(config);
    this.fireStore = firebase.firestore();
  }
}

module.exports = FirebaseAdapter;

export {};
