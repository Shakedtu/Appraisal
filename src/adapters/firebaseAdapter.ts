import { ICase } from '../types/types';

declare var window;
export const firebase = window.firebase;
export const casesRef = firebase.firestore().collection('cases');
export const clientsRef = firebase.firestore().collection('clients');
export const contactsRef = firebase.firestore().collection('contacts');
export interface firebaseAdapter {
  authenticate;
  addClient;
  addContact;
  addCase;
  getCase;
  getCases;
  getCollection;
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
    const docRef = await firebase
      .firestore()
      .collection('clients')
      .add(clientData);
    return docRef.id;
  },
  addContact: async (contactData) => {
    const docRef = await firebase
      .firestore()
      .collection('contacts')
      .add(contactData);
    return docRef.id;
  },
  addCase: async (caseData) => {
    const docRef = await firebase.firestore().collection('cases').add(caseData);
    return docRef.id;
  },
  getCase: async (id) => {
    const caseData =
      await casesRef
        .doc(id)
        .get();
    const data = caseData.data();
    return data;
  },
  getCases: async (casesRef) => {
    return casesRef.get().then((casesData) => {
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
  getCollection: (collectionName: string) => {
    return firebase.firestore().collection(collectionName);
  },
  deleteClient: async (id: string) => {
    const res = await clientsRef.doc(id).delete();
    console.log(res);
  },
  deleteContact: async (id: string) => {
    const res = await contactsRef.doc(id).delete();
    console.log(res);
  },
  deleteCase: async (id: string) => {
    const res = await casesRef.doc(id).delete();
    console.log(res);
  },
};
