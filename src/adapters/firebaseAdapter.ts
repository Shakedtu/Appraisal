import { ICase } from '../types/types';

declare var window;
export const firebase = window.firebase;
// const casesRef = firebase.firestore().collection('cases');
// const clientsRef = firebase.firestore().collection('clients');
// const contactsRef = firebase.firestore().collection('contacts');
export interface firebaseAdapter {
  authenticate;
  addClient;
  addContact;
  getCollection;
  addCase;
  getCase;
  getCases;
  deleteClient;
  deleteContact;
  deleteCase;
}

export const firebaseAdapter = {
  authenticate: async (provider) => {
    const { user, credential } = await firebase
      .auth()
      .signInWithPopup(provider);
    const token = credential?.['accessToken'];
    sessionStorage.setItem('token', token);
    return token;
  },
  addClient: async (clientData) => {
    const docRef = await firebaseAdapter
      .getCollection('clients')
      .add(clientData);
    return docRef.id;
  },
  addContact: async (contactData) => {
    const docRef = await firebaseAdapter
      .getCollection('contacts')
      .add(contactData);
    return docRef.id;
  },
  getCollection: (collectionName: string) => {
    return firebase.firestore().collection(collectionName);
  },
  addCase: async (caseData) => {
    const docRef = await firebaseAdapter.getCollection('cases').add(caseData);
    return docRef.id;
  },
  getCase: async (id) => {
    const caseData = await firebaseAdapter.getCollection('cases').doc(id).get();
    const data = caseData.data();
    return data;
  },
  getCases: async () => {
    return await firebaseAdapter
      .getCollection('cases')
      .get()
      .then((casesData) => {
        let newState: ICase[] = [];
        casesData.forEach((doc) => {
          let newCase: ICase = {
            id: doc.id,
            type: doc.data().type,
            client: doc.data().client,
            address: doc.data().address,
            createdAt: doc.data().createdAt,
            status: doc.data().status,
            comments: doc.data().comments,
            contacts: doc.data().contacts,
          };
          newState.push(newCase);
        });
        return newState;
      });
  },
  deleteClient: async (id: string) => {
    const res = await firebaseAdapter.getCollection('clients').doc(id).delete();
    console.log(res);
  },
  deleteContact: async (id: string) => {
    const res = await firebaseAdapter
      .getCollection('contacts')
      .doc(id)
      .delete();
    console.log(res);
  },
  deleteCase: async (id: string) => {
    const res = await firebaseAdapter.getCollection('cases').doc(id).delete();
    console.log(res);
  },
};
