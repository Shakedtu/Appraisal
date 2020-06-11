var express = require('express');
var logger = require('connect-logger');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
// const admin = require('firebase-admin');
var firebase = require('firebase');

// const issuerURI = "https://sts.windows.net/4d237583-6e63-43c9-ab9c-4b10fac8a63e/"; //TODO: Provide your Azure AD tenant ID here.
// const tenantName = "appraisalweb.onmicrosoft.com"; //TODO: Provide your tenant name here. example: companyxyz. (companyxyz.onmicrosoft.com)
// const clientId = "84432866-eb77-48cf-be4f-86e568cf3d7f"; //TODO: provide your application clientId here.
// // Minting a Firebase Auth token requires manual wiring of the service account
// const serviceAccount = require("./serviceAccount.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://appraisal-d63ea.firebaseio.com"
// });
var port = 5000;
var app = express();
// var provider = new firebase.auth.OAuthProvider('microsoft.com');
// provider.setCustomParameters({
//   // Optional "tenant" parameter in case you are using an Azure AD tenant.
//   // eg. '8eaef023-2b34-4da1-9baa-8bc8c9d6a490' or 'contoso.onmicrosoft.com'
//   // or "common" for tenant-independent tokens.
//   // The default value is "common".
//   tenant: '84432866-eb77-48cf-be4f-86e568cf3d7f'
// });
// provider.addScope('mail.read');
// provider.addScope('calendars.read');

app.get('/', function (req, res) {
  // firebase.auth().signInWithRedirect(provider);
  // firebase.auth().getRedirectResult()
  //   .then(function (result) {
  //     console.log(result);
  //     // User is signed in.
  //     // IdP data available in result.additionalUserInfo.profile.
  //     // OAuth access token can also be retrieved:
  //     // result.credential.accessToken
  //     // OAuth ID token can also be retrieved:
  //     // result.credential.idToken
  //   })
  //   .catch(function (error) {
  //     // Handle error.
  //   });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${ port }!`);
});