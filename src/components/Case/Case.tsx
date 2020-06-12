import React, { FunctionComponent, useState } from 'react';
import CaseMenu, { CaseMenuTabs } from './CaseMenu/CaseMenu';
import ContactInfo from './ContactInfo';
import MoreInfo from './MoreInfo';

const Tabs = {
  [CaseMenuTabs.CONTACT_INFO]: <ContactInfo tab={CaseMenuTabs.CONTACT_INFO} />,
  [CaseMenuTabs.MORE_INFO]: <MoreInfo />,
  [CaseMenuTabs.BILL_INFO]: <ContactInfo tab={CaseMenuTabs.BILL_INFO} />,
  [CaseMenuTabs.DOCUMENTS]: <ContactInfo tab={CaseMenuTabs.DOCUMENTS} />,
};

const Case: FunctionComponent = () => {
  const [selectedTab, setSelectedTab] = useState<CaseMenuTabs>(
    CaseMenuTabs.CONTACT_INFO
  );
  const onSelectTab = ({ key }) => setSelectedTab(key);

  return (
    <div>
      <CaseMenu selectedTab={selectedTab} onSelect={onSelectTab} />
      {Tabs[selectedTab]}
    </div>
  );
};

export default Case;
