import React, { FunctionComponent, useState } from 'react';
import CaseMenu, { CaseMenuTabs } from './CaseMenu/CaseMenu';
import CaseInfo from './CaseInfo/CaseInfo';
import Billing from './Billing';
import Contacts from './Contacts';
import { firebaseAdapter } from '../../adapters/FirebaseAdapter';
import { ICase } from '../../types/types';
import { useQuery, ReactQueryCacheProvider, useQueryCache } from 'react-query';
import { Spin } from 'antd';

const Case: FunctionComponent<{ match: { params: { id } } }> = ({
  match: {
    params: { id },
  },
}) => {
  const [selectedTab, setSelectedTab] = useState<CaseMenuTabs>(
    CaseMenuTabs.CASE_INFO
  );

  const getCaseData = () => firebaseAdapter.getCase(id);
  const queryCache = useQueryCache();
  const { data, isLoading } = useQuery('getCaseData', getCaseData);
  // console.log('data from case', data);
  // console.log('cached data', queryCache.getQueryData('getCaseData'));

  const Tabs = {
    [CaseMenuTabs.CASE_INFO]: <CaseInfo />,
    [CaseMenuTabs.CONTACTS]: <CaseInfo />,
    [CaseMenuTabs.BILL_INFO]: <CaseInfo />,
    // [CaseMenuTabs.DOCUMENTS]: <ContactInfo tab={CaseMenuTabs.DOCUMENTS} />,
  };

  const onSelectTab = ({ key }) => {
    console.log('ist');
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
