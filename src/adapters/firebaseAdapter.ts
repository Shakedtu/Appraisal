export const firebase = window.firebase;

export interface firebaseAdapter {
  authenticate;
  addUser;
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
  addUser: async (userData) => {
    const docRef = await firebase.firestore().collection('users').add(userData);
    return docRef.id;
  },
};
