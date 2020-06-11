import React from 'react';
import * as firebase from 'firebase';
import axios from 'axios';
const config = {
  apiKey: "AIzaSyAS91XPmhjwEBUP7Edni69_s4kJ9KlcBEA",
  authDomain: "appraisal-d63ea.firebaseapp.com",
  databaseURL: "https://appraisal-d63ea.firebaseio.com",
  projectId: "appraisal-d63ea",
  storageBucket: "appraisal-d63ea.appspot.com",
  messagingSenderId: 684392560190
};

firebase.initializeApp(config);

var provider = new firebase.auth.OAuthProvider('microsoft.com');
provider.addScope('profile');

const startLogin = () => {
  firebase.auth().signInWithPopup(provider)
    .then(function (result: firebase.auth.UserCredential) {
      if (result === null) return;
      if (result.credential === null) return;
      const token = result.credential["accessToken"];
      // // The signed-in user info.
      const user = result.user;
      axios.post('/auth', {
        user: user
      }, {
        headers: { Authorization: `Bearer ${ token }` }
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
}

const Login = () => {
  var authed = false;
  provider.setCustomParameters({
    tenant: "4d237583-6e63-43c9-ab9c-4b10fac8a63e"
  });
  provider.addScope('mail.read');
  provider.addScope('calendars.read');
  return (
    <div>
      <button className="button" onClick={startLogin}>Login with MS</button>
    </div>
  );

}

export default Login;