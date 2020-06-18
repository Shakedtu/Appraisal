import React from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const endpoint = async (history) => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.post(
      '/drive',
      {
        name: 'endpoint',
        path: '',
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
  } catch (error) {
    console.log('error: ', error);
  }
};

const Endpoint = () => {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <div>
      <Button className="button" onClick={() => endpoint(history)}>
        {t('בדיקות')}
      </Button>
    </div>
  );
};

export default Endpoint;
