import React, { FunctionComponent } from 'react';
import { CaseMenuTabs } from './CaseMenu/CaseMenu';
import { Card } from 'antd';
import { useTranslation } from 'react-i18next';
import { ICase } from '../../types/types';

const ContactInfo: FunctionComponent<{ data: ICase }> = ({ data }) => {
  console.log('data ', data);
  const { contacts } = data;
  const { t } = useTranslation();
  return (
    <>
      <Card>
        <p>{t('contact-info.contacts.title')}</p>
        {contacts.map((contact) => (
          <p>
            {contact.name}, {contact.phone}
          </p>
        ))}
      </Card>
    </>
  );
};

export default ContactInfo;
