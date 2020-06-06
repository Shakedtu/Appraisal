// const express = require('express');
// const dotenv = require('dotenv');
// const msal = require('@azure/msal-node');
// const pcg = require('./authConfig.ts');
// const myLocalCache = require('./data/cache');

// // Create the main myMSALObj instance
// // configuration parameters are located at authConfig.js
// const pca = new msal.UserAgentApplication(pcg);

// let accessToken;
// pca.initizalieCache(myLocalCache);

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//   const authCodeUrlParameters = {
//     scopes: ["user.read"],
//     redirectUri: ["http://localhost:3000/auth/callback"],
//     prompt: msal.Prompt.SELECT_ACCOUNT
//   };

//   // get url to sign user in and consent to scopes needed for application
//   pca.getAuthCodeUrl(authCodeUrlParameters)
//     .then((response) => {
//       console.log(response);
//       res.redirect(response);
//     })
//     .catch((error) => console.log(JSON.stringify(error)));
// });

// app.get('/auth/callback', (req, res) => {
//   const tokenRequest = {
//     code: req.query.code,
//     redirectUri: "http://localhost:3000/auth/callback",
//     scopes: ["user.read"],
//     // codeVerifier: ""
//   };

//   pca.acquireTokenByCode(tokenRequest).then((response) => {
//     console.log("\nResponse: \n:", response);
//     res.send(200);
//     // uncomment this to show writing of cache, dont commit real tokens.
//     // fs.writeFileSync("./data/cache.json", JSON.stringify(pca.readCache()), null, 4);
//   }).catch((error) => {
//     console.log(error);
//     res.status(500).send(error);
//   });
// });
// // app.get('/', (req, res) => {
// //   res.send('welcome');
// // });

// app.listen(port, () => {
//   console.log(`Server is listening on port ${ port }!`);
// });

// module.exports = app;

/*
 * @copyright
 * Copyright © Microsoft Open Technologies, Inc.
 *
 * All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http: *www.apache.org/licenses/LICENSE-2.0
 *
 * THIS CODE IS PROVIDED *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION
 * ANY IMPLIED WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A
 * PARTICULAR PURPOSE, MERCHANTABILITY OR NON-INFRINGEMENT.
 *
 * See the Apache License, Version 2.0 for the specific language
 * governing permissions and limitations under the License.
 */
'use strict';

var express = require('express');
var logger = require('connect-logger');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
// var fs = require('fs');
var crypto = require('crypto');

var AuthenticationContext = require('adal-node').AuthenticationContext;
var port = 5000;
var app = express();
app.use(logger());
app.use(cookieParser('a deep secret'));
app.use(session({ secret: '1234567890QWERTY' }));

app.get('/', function (req, res) {
  res.redirect('login');
});

/*
 * You can override the default account information by providing a JSON file
 * with the same parameters as the sampleParameters variable below.  Either
 * through a command line argument, 'node sample.js parameters.json', or
 * specifying in an environment variable.
 * {
 *   "tenant" : "rrandallaad1.onmicrosoft.com",
 *   "authorityHostUrl" : "https://login.windows.net",
 *   "clientId" : "624ac9bd-4c1c-4686-aec8-e56a8991cfb3",
 *   "clientSecret" : "verySecret="
 * }
 */
// var parametersFile = process.argv[2] || process.env['ADAL_SAMPLE_PARAMETERS_FILE'];

// var sampleParameters;
// if (parametersFile) {
//   var jsonFile = fs.readFileSync(parametersFile);
//   if (jsonFile) {
//     sampleParameters = JSON.parse(jsonFile);
//   } else {
//     console.log('File not found, falling back to defaults: ' + parametersFile);
//   }
// }

// if (!parametersFile) {
//   sampleParameters = {
//     tenant: 'rrandallaad1.onmicrosoft.com',
//     authorityHostUrl: 'https://login.windows.net',
//     clientId: '624ac9bd-4c1c-4686-aec8-b56a8991cfb3',
//     username: 'frizzo@naturalcauses.com',
//     password: ''
//   };
// }

var sampleParameters = {
  tenant: 'appraisalweb.onmicrosoft.com',
  authorityHostUrl: 'https://login.windows.net',
  clientId: '84432866-eb77-48cf-be4f-86e568cf3d7f',
  clientSecret: '182lxanMFQf-ED-.8CPbp3vM3-~Sxnd5n1'
  // username: 'frizzo@naturalcauses.com',
  // password: ''
};

var authorityUrl = sampleParameters.authorityHostUrl + '/' + sampleParameters.tenant;
var redirectUri = 'http://localhost:5000/auth/redirect';
var resource = '00000002-0000-0000-c000-000000000000';

// var templateAuthzUrl = 'https://login.microsoftonline.com/' + sampleParameters.tenant + '/oauth2/authorize?response_type=code&client_id=<client_id>&redirect_uri=<redirect_uri>&state=<state>&resource=<resource>';

var templateAuthzUrl = 'https://login.microsoftonline.com/' +
  sampleParameters.tenant
  + '/oauth2/authorize?client_id=<client_id>&response_type=code&redirect_uri=<redirect_uri>&response_mode=query&scope=openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fmail.read&state=<state>';
// https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize?
// client_id=6731de76-14a6-49ae-97bc-6eba6914391e
// &response_type=code
// &redirect_uri=http%3A%2F%2Flocalhost%2Fmyapp%2F
// &response_mode=query
// &scope=openid%20offline_access%20https%3A%2F%2Fgraph.microsoft.com%2Fmail.read
// &state=12345

app.get('/', function (req, res) {
  res.redirect('/login');
});

app.get('/login', function (req, res) {
  console.log(req.cookies);

  // res.cookie('acookie', 'this is a cookie');
  res.redirect('/auth');
  //   res.send('\
  // <head>\
  //   <title>test</title>\
  // </head>\
  // <body>\
  //   <a href="./auth">Login</a>\
  // </body>\
  //     ');
});

function createAuthorizationUrl(state) {
  var authorizationUrl = templateAuthzUrl.replace('<client_id>', sampleParameters.clientId);
  authorizationUrl = authorizationUrl.replace('<redirect_uri>', redirectUri);
  authorizationUrl = authorizationUrl.replace('<state>', state);
  // authorizationUrl = authorizationUrl.replace('<resource>', resource);
  return authorizationUrl;
}

// Clients get redirected here in order to create an OAuth authorize url and redirect them to AAD.
// There they will authenticate and give their consent to allow this app access to
// some resource they own.
app.get('/auth', function (req, res) {
  crypto.randomBytes(48, function (ex, buf) {
    var token = buf.toString('base64').replace(/\//g, '_').replace(/\+/g, '-');
    console.log('token is ', token);
    res.cookie('authstate', token);
    var authorizationUrl = createAuthorizationUrl(token);
    console.log('auth url ', authorizationUrl);
    res.redirect(authorizationUrl);
  });
});

// After consent is granted AAD redirects here.  The ADAL library is invoked via the
// AuthenticationContext and retrieves an access token that can be used to access the
// user owned resource.
app.get('/auth/redirect', function (req, res) {
  console.log('cookies ', req.cookies);
  console.log('cookie ', req.cookies.authstate);
  console.log('cookie ', req.query.state);

  if (req.cookies.authstate !== req.query.state) {
    res.send('error: state does not match');
  }
  var authenticationContext = new AuthenticationContext(authorityUrl);
  authenticationContext.acquireTokenWithAuthorizationCode(req.query.code, redirectUri, resource, sampleParameters.clientId, sampleParameters.clientSecret, function (err, response) {
    var message = '';
    if (err) {
      message = 'error: ' + err.message + '\n';
    }
    message += 'response: ' + JSON.stringify(response);

    if (err) {
      res.send(message);
      return;
    }

    // Later, if the access token is expired it can be refreshed.
    authenticationContext.acquireTokenWithRefreshToken(response.refreshToken, sampleParameters.clientId, sampleParameters.clientSecret, resource, function (refreshErr, refreshResponse) {
      if (refreshErr) {
        message += 'refreshError: ' + refreshErr.message + '\n';
      }
      message += 'refreshResponse: ' + JSON.stringify(refreshResponse);

      res.send(message);
    });
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${ port }!`);
});