import React, { FunctionComponent, useState, useEffect } from 'react';
import CaseMenu, { CaseMenuTabs } from './CaseMenu/CaseMenu';
import CaseInfo from './CaseInfo';
import Billing from './Billing';
import Contacts from './Contacts';
import { firebaseAdapter } from '../../adapters/firebaseAdapter';
import { ICase, CaseType, CaseStatus } from '../../types/types';
import moment from 'moment';

const Case: FunctionComponent<{ match: { params: { id } } }> = ({
  match: {
    params: { id },
  },
}) => {
  const [selectedTab, setSelectedTab] = useState<CaseMenuTabs>(
    CaseMenuTabs.CASE_INFO
  );

  const [caseData, setCaseData] = useState<ICase>({
    type: CaseType.WATER,
    client: {
      name: 'ישראל ישראלי',
    },
    createdAt: moment().format('DD/MM/YYYY'),
    status: CaseStatus.NEW,
    comments: '',
    contacts: [],
  });

  const Tabs = {
    [CaseMenuTabs.CASE_INFO]: <CaseInfo data={caseData} />,
    [CaseMenuTabs.CONTACTS]: <Contacts contacts={caseData.contacts} />,
    [CaseMenuTabs.BILL_INFO]: <Billing data={caseData} />,
    // [CaseMenuTabs.DOCUMENTS]: <ContactInfo tab={CaseMenuTabs.DOCUMENTS} />,
  };
  const onSelectTab = ({ key }) => setSelectedTab(key);

  useEffect(() => {
    const getCaseData = async () => {
      const result = await firebaseAdapter.getCase(id);
      setCaseData(result);
    };

    getCaseData();
  }, [caseData, id]);

  return (
    <div>
      <CaseMenu
        selectedTab={selectedTab}
        onSelect={onSelectTab}
        caseDoc={caseData}
      />
      {Tabs[selectedTab]}
    </div>
  );
};

export default Case;
