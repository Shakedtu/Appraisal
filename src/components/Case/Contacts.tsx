import React from 'react';
import { Contact } from '../../types/types';
import { Card } from 'antd';
import { useTranslation } from 'react-i18next';

const Contacts: React.FunctionComponent<{ contacts: Contact[] }> = ({
  contacts,
}) => {
  const { t } = useTranslation();

  const createContactItem = (contact: Contact, index: number) => {
    return (
      <>
        <p>
          {contacts.length > 1 ? (
            <p>
              {index + 1}. {t(`case.contact-info.contacts.name`)}:{' '}
              {contact.name}
            </p>
          ) : (
            <p>
              {t(`case.contact-info.contacts.name`)}: {contact.name}
            </p>
          )}
        </p>
        <p>
          {t(`case-table.add-contact-modal.contact-type`)}: {contact.type}
        </p>
        <p>
          {t(`case-table.add-contact-modal.phone`)}: {contact.phone}
        </p>
        <p>
          {t(`file-table.header.column.address`)}:{contact.address.street}{' '}
          {contact.address.houseNumber}, {contact.address.city}
        </p>
        <p>
          {t(`case-table.add-contact-modal.email`)}: {contact.email}
        </p>
        <p>
          {t(`case-table.add-contact-modal.fax-number`)}: {contact.fax}
        </p>
      </>
    );
  };

  return (
    <>
      <Card>
        {contacts.map((contact, index) => createContactItem(contact, index))}
      </Card>
    </>
  );
};

export default Contacts;
