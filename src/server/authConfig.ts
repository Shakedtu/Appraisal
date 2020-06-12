const authConfig = {
  auth: {
    clientId: '84432866-eb77-48cf-be4f-86e568cf3d7f',
    authority:
      'https://login.microsoftonline.com/4d237583-6e63-43c9-ab9c-4b10fac8a63e',
    redirectUri: 'http://localhost:3000/auth/callback',
  },
  cache: {
    cacheLocation: 'fileCache', // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

module.exports = authConfig;
