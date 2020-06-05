const express = require('express');
const dotenv = require('dotenv');
const msal = require('@azure/msal');
const pcg = require('./authConfig');
const myLocalCache = require('./data/cache.json');

// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const pca = new msal.PublicClientApplication(pcg);

let accessToken;
pca.initizalieCache(myLocalCache);

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  const authCodeUrlParameters = {
    scopes: ["user.read"],
    redirectUri: ["http://localhost:3000/auth/callback"],
    prompt: msal.Prompt.SELECT_ACCOUNT
  };

  // get url to sign user in and consent to scopes needed for application
  pca.getAuthCodeUrl(authCodeUrlParameters)
    .then((response) => {
      console.log(response);
      res.redirect(response);
    })
    .catch((error) => console.log(JSON.stringify(error)));
});

app.get('/auth/callback', (req, res) => {
  const tokenRequest = {
    code: req.query.code,
    redirectUri: "http://localhost:3000/auth/callback",
    scopes: ["user.read"],
    // codeVerifier: ""
  };

  pca.acquireTokenByCode(tokenRequest).then((response) => {
    console.log("\nResponse: \n:", response);
    res.send(200);
    // uncomment this to show writing of cache, dont commit real tokens.
    // fs.writeFileSync("./data/cache.json", JSON.stringify(pca.readCache()), null, 4);
  }).catch((error) => {
    console.log(error);
    res.status(500).send(error);
  });
});
// app.get('/', (req, res) => {
//   res.send('welcome');
// });

app.listen(port, () => {
  console.log(`Server is listening on port ${ port }!`);
});

module.exports = app;
