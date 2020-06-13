import * as firebase from 'firebase';

const provider = new firebase.auth.OAuthProvider('microsoft.com');
provider.setCustomParameters({
  tenant: '4d237583-6e63-43c9-ab9c-4b10fac8a63e',
});
provider.addScope('profile');
provider.addScope('mail.read');
provider.addScope('calendars.read');
provider.addScope('offline_access');

export { provider as default };
