import React from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

const createFolder = async (history) => {
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

const createFile = async (history) => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.put(
      '/drive/fileTest.txt',
      {
        path: 'test',
        content: 'testing content',
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response);
  } catch (error) {
    console.log('error: ', error);
  }
};

const deleteFileorFolder = async (history) => {
  try {
    const token = sessionStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        path: '',
      }
    };
    const response = await axios.delete(
      '/drive/test',
      config
    );
    console.log(response);
  } catch (error) {
    console.log('error: ', error);
  }
};

const search = async (history) => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(
      '/drive/test1',
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
      <Button className="button" onClick={() => createFolder(history)}>
        {t('server_test.create-folder')}
      </Button>
      <Button className="button" onClick={() => createFile(history)}>
        {t('server_test.create-file')}
      </Button>
      <Button className="button" onClick={() => deleteFileorFolder(history)}>
        {t('server_test.delete')}
      </Button>
      <Button className="button" onClick={() => search(history)}>
        {t('server_test.search')}
      </Button>
    </div>
  );
};

export default Endpoint;
