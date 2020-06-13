import React from 'react';
import * as firebase from 'firebase';
import axios from 'axios';
import { Button } from 'antd';
import { WindowsFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import MicrosoftProvider from '../Providers/MicrosoftProvider';
import dotenv from 'dotenv';
import config from '../firebaseConfig.json';

firebase.initializeApp(config);

const startLogin = async (history) => {
  try {
    const {
      user,
      credential,
    }: firebase.auth.UserCredential = await firebase
      .auth()
      .signInWithPopup(MicrosoftProvider);
    const token = credential?.['accessToken'];
    await axios.post(
      '/auth',
      { user },
      { headers: { Authorization: `Bearer ${ token }` } }
    );
    history.push('/cases');
  } catch (error) {
    console.log('error: ', error);
  }
};

const Login = () => {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <div>
      <Button
        className="button"
        onClick={() => startLogin(history)}
        icon={<WindowsFilled />}
      >
        {t('login_page.login')}
      </Button>
    </div>
  );
};

export default Login;
