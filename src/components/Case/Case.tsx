import React, { FunctionComponent, useState, useEffect } from 'react';
import CaseMenu, { CaseMenuTabs } from './CaseMenu/CaseMenu';
import ContactInfo from './ContactInfo';
import Billing from './Billing';
import MoreInfo from './MoreInfo';
import { firebaseAdapter } from '../../adapters/firebaseAdapter';
import { ICase, CaseType, CaseStatus } from '../../types/types';

const Case: FunctionComponent<{ match: { params: { id } } }> = ({
  match: {
    params: { id },
  },
}) => {
  const [selectedTab, setSelectedTab] = useState<CaseMenuTabs>(
    CaseMenuTabs.CONTACT_INFO
  );

  const [caseData, setCaseData] = useState<ICase>({
    type: CaseType.WATER,
    client: {
      name: 'ישראל ישראלי',
    },
    createdAt: 0,
    status: CaseStatus.NEW,
    comments: '',
    contacts: []
  });

  const Tabs = {
    [CaseMenuTabs.CONTACT_INFO]: (
      <ContactInfo data={caseData} />
    ),
    [CaseMenuTabs.MORE_INFO]: <MoreInfo />,
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
