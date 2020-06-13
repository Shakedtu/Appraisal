import React from 'react';
import * as firebase from 'firebase';
import axios from 'axios';
import { Button } from 'antd';
import { WindowsOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const config = {
  apiKey: 'AIzaSyAS91XPmhjwEBUP7Edni69_s4kJ9KlcBEA',
  authDomain: 'appraisal-d63ea.firebaseapp.com',
  databaseURL: 'https://appraisal-d63ea.firebaseio.com',
  projectId: 'appraisal-d63ea',
  storageBucket: 'appraisal-d63ea.appspot.com',
  messagingSenderId: 684392560190,
};

firebase.initializeApp(config);

const provider = new firebase.auth.OAuthProvider('microsoft.com');

const startLogin = async (history) => {
  try {
    const {
      user,
      credential,
    }: firebase.auth.UserCredential = await firebase
      .auth()
      .signInWithPopup(provider);
    const token = credential?.['accessToken'];
    await axios.post(
      '/auth',
      { user },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    history.push('/cases');
  } catch (error) {
    console.log('error: ', error);
  }
};

const Login = () => {
  const { t } = useTranslation();
  const history = useHistory();
  provider.setCustomParameters({
    tenant: '4d237583-6e63-43c9-ab9c-4b10fac8a63e',
  });
  provider.addScope('profile');
  provider.addScope('mail.read');
  provider.addScope('calendars.read');
  provider.addScope('offline_access');
  return (
    <div>
      <Button
        className="button"
        onClick={() => startLogin(history)}
        icon={<WindowsOutlined />}
      >
        {t('login_page.login')}
      </Button>
    </div>
  );
};

export default Login;
