import React, { FunctionComponent, useState } from 'react';
import CaseMenu, { CaseMenuTabs } from './CaseMenu/CaseMenu';
import CaseInfo from './CaseInfo/CaseInfo';
// import Billing from './Billing';
import Contacts from './Contacts';
import { firebaseAdapter } from '../../adapters/Firebase/FirebaseAdapter';
import { useQuery } from 'react-query';
import { Spin } from 'antd';

const Case: FunctionComponent<{ match: { params: { id } } }> = ({
  match: {
    params: { id },
  },
}) => {
  const [selectedTab, setSelectedTab] = useState<CaseMenuTabs>(
    CaseMenuTabs.CONTACTS
  );

  const getCaseData = () => firebaseAdapter.getCase(id);
  const { data, isLoading } = useQuery('getCaseData', getCaseData);

  const Tabs = {
    [CaseMenuTabs.CASE_INFO]: <CaseInfo />,
    [CaseMenuTabs.CONTACTS]: <Contacts />,
    [CaseMenuTabs.BILL_INFO]: <CaseInfo />,
    // [CaseMenuTabs.DOCUMENTS]: <ContactInfo tab={CaseMenuTabs.DOCUMENTS} />,
  };

  const onSelectTab = ({ key }) => {
    setSelectedTab(key);
  };

  return isLoading ? (
    <Spin />
  ) : (
    data && (
      <div>
        <CaseMenu
          selectedTab={selectedTab}
          onSelect={onSelectTab}
          clientName={data.clientName}
        />
        {Tabs[selectedTab]}
      </div>
    )
  );
};

export default Case;
