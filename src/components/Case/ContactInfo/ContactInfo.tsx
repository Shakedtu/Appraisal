import React, {FunctionComponent, useState} from 'react';
import { Descriptions, Typography } from 'antd';

interface Contact {
    id?: string;
    type: string;
    name: string;
    address: string;
    phone: string;
    email: string
}

const ContactInfo: FunctionComponent = () => {
    const { Text } = Typography;
    const [contacts, setContacts] = useState<Contact[]>([])

    const addContact = (contact: Contact) => {
        setContacts(currentContact => [...currentContact, contact])
    }

    const removeContact = (contact: Contact) => {
        setContacts(currentContact => currentContact.filter(c =>  c.id !== contact.id))
    }


   return (
       <>
       </>
   )
}

export default ContactInfo;