import React, { FunctionComponent } from 'react';
import { CaseMenuTabs } from './CaseMenu/CaseMenu';

interface Contact {
  id?: string;
  type: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

const ContactInfo: FunctionComponent<{ tab: CaseMenuTabs }> = (props) => {
  return <>{props.tab}</>;
};

export default ContactInfo;
