import { ICase, ICaseInfo } from '../../types/types';
import firebase from 'firebase';

export interface FirebaseAdapter {
  init;
  authenticate;
  addClient;
  addContact;
  getCollection;
  addCase;
  updateCase: (dataToUpdate: ICaseInfo) => Promise<ICase>;
  updateContact: ({ id, contacts }) => Promise<ICase>;
  getCase;
  getCases: () => Promise<ICase[]>;
  getCasesByInsurer: (insurer: string) => Promise<ICase[]>;
  deleteClient;
  deleteContact;
  deleteCase;
}

export const firebaseAdapter: FirebaseAdapter = {
  init: () => {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseUrl: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    };

    firebase.initializeApp(firebaseConfig);
    if (!window.firebase) window.firebase = firebase;
  },
  authenticate: async (provider) => {
    const { credential } = await firebase.auth().signInWithPopup(provider);
    const token = credential?.['accessToken'];
    localStorage.setItem('token', token);
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
  updateCase: ({ id, ...caseInfo }: ICaseInfo) => {
    const casesCollection = firebaseAdapter.getCollection('cases');
    const response = casesCollection.doc(id).update(caseInfo);
    return response;
  },
  updateContact: ({ id, contacts }) => {
    const casesCollection = firebaseAdapter.getCollection('cases');
    const response = casesCollection.doc(id).update({ contacts });
    return response;
  },
  getCase: async (id) => {
    const caseData = await firebaseAdapter.getCollection('cases').doc(id).get();
    const data = caseData.data();
    return { id: id, ...data };
  },
  getCases: (): Promise<ICase[]> => {
    return firebaseAdapter
      .getCollection('cases')
      .get()
      .then((casesData) => {
        let newState: ICase[] = [];
        casesData.forEach((doc) => {
          let newCase: ICase = {
            id: doc.id,
            ...doc.data(),
          } as ICase;

          newState.push(newCase);
        });
        return newState;
      });
  },
  getCasesByInsurer: async (insurer: string): Promise<ICase[]> => {
    const casesRef = firebaseAdapter.getCollection('cases');
    const casesArray: ICase[] = [];
    const snapshot = await casesRef.where('client/name', '==', insurer).get();
    snapshot.forEach((doc) => {
      const caseData: ICase = {
        id: doc.id,
        ...(doc.data() as ICase),
      };
      casesArray.push(caseData);
      console.log(doc.id, '=>', doc.data());
    });
    return casesArray;
  },
  deleteClient: async (id: string) => {
    return firebaseAdapter.getCollection('clients').doc(id).delete();
  },
  deleteContact: async (id: string) => {
    return firebaseAdapter.getCollection('contacts').doc(id).delete();
  },
  deleteCase: async (id: string) => {
    return firebaseAdapter.getCollection('cases').doc(id).delete();
  },
};
