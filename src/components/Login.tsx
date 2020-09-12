import React from 'react';
import { Button } from 'antd';
import { WindowsFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import MicrosoftProvider from '../Providers/MicrosoftProvider';
import { firebaseAdapter } from '../adapters/firebaseAdapter';

const startLogin = async (history) => {
  try {
    await firebaseAdapter.authenticate(MicrosoftProvider);
    history.push('/test');
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
