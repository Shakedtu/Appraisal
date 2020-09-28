import React from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { firebaseAdapter } from '../adapters/FirebaseAdapter';
import wordAdapter from '../adapters/wordAdapter';
import {
  Client,
  ICase,
  Contact,
  ContactType,
  CaseType,
  Address,
  CaseStatus,
} from '../types/types';
import moment from 'moment';
import { OneDriveAdapter } from '../adapters/OneDriveAdapter';

const createFolder = async (history) => {
  const oneDrive = new OneDriveAdapter();
  try {
    const response = await oneDrive.getDrive;
    console.log(response);
  } catch (error) {
    console.log('error: ', error);
  }
};

const createFile = async (history) => {
  try {
    const token = localStorage.getItem('token');
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
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        path: '',
      },
    };
    const response = await axios.delete('/drive/test1.docx', config);
    console.log(response);
  } catch (error) {
    console.log('error: ', error);
  }
};

const search = async (history) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('/drive/endpoint', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response);
  } catch (error) {
    console.log('error: ', error);
  }
};

const addClient = async () => {
  const client: Client = {
    name: 'example',
  };
  console.log(await firebaseAdapter.addClient(client));
};

const addContact = async () => {
  const contact: Contact = {
    type: ContactType.INSURANCE_COMPANY,
    name: 'example',
    phone: '00',
    address: {
      street: 'רחוב',
      houseNumber: '5',
      city: 'תל אביב',
    },
    email: 'test@gmail.com',
  };

  console.log(await firebaseAdapter.addContact(contact));
};

const addCase = async () => {
  const contact: Contact = {
    type: ContactType.INSURANCE_COMPANY,
    name: 'example',
    phone: '00',
    address: {
      street: 'רחוב',
      houseNumber: '5',
      city: 'תל אביב',
    },
    email: 'test@gmail.com',
  };

  const client: Client = {
    name: 'migdal',
  };

  const address: Address = {
    street: 'example',
    houseNumber: '6',
    city: 'Tel Aviv',
  };

  const newCase: ICase = {
    type: CaseType.WATER,
    client: client,
    address: address,
    createdAt: moment().format('DD/MM/YYYY'),
    status: CaseStatus.NEW,
    comments: '',
    contacts: [contact],
  };

  console.log(await firebaseAdapter.addCase(newCase));
};

const deleteClient = async () => {
  console.log(await firebaseAdapter.deleteClient('1'));
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
      <Button className="button" onClick={() => addClient()}>
        {t('server_test.add-client')}
      </Button>
      <Button className="button" onClick={() => addContact()}>
        {t('server_test.add-contact')}
      </Button>
      <Button className="button" onClick={() => addCase()}>
        {t('server_test.add-case')}
      </Button>
      <Button className="button" onClick={() => deleteClient()}>
        deleteClient
      </Button>
      <Button
        className="button"
        onClick={() => {
          const word = new wordAdapter();
          word.generateReceite();
        }}
      >
        create doc
      </Button>
    </div>
  );
};

export default Endpoint;
