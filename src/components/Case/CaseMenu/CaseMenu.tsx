import React, { FunctionComponent } from 'react';
import { Menu, PageHeader } from 'antd';
import {
  SolutionOutlined,
  BankOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './CaseMenu.scss';

export interface MenuTabProps {
  key: string;
  icon: React.ReactNode;
  text: string;
}

export enum CaseMenuTabs {
  CASE_INFO = 'case-info',
  CONTACTS = 'contacts',
  BILL_INFO = 'bill-info',
  DOCUMENTS = 'documents',
}
interface CaseMenuProps {
  selectedTab: CaseMenuTabs;
  onSelect;
  clientName;
}

const CaseMenu: FunctionComponent<CaseMenuProps> = ({
  selectedTab,
  onSelect,
  clientName,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const onBack = () => history.goBack();
  const MenuTabs: MenuTabProps[] = [
    {
      key: CaseMenuTabs.CASE_INFO,
      icon: <SolutionOutlined />,
      text: t('case.menu.item.case-info'),
    },
    {
      key: CaseMenuTabs.CONTACTS,
      icon: <SolutionOutlined />,
      text: t('case.menu.item.contacts'),
    },
    {
      key: CaseMenuTabs.BILL_INFO,
      icon: <BankOutlined />,
      text: t('case.menu.item.bill-info'),
    },
    {
      key: CaseMenuTabs.DOCUMENTS,
      icon: <FileOutlined />,
      text: t('case.menu.item.documents'),
    },
  ];

  const MenuTab = ({ key, icon, text }) => {
    return (
      <Menu.Item icon={icon} key={key}>
        {text}
      </Menu.Item>
    );
  };
  // const cache = useQueryCache();
  // const data = cache.getQueryData('getCaseData');
  // console.log('cm d', data);

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={onBack}
        title={t('case.header.title', { name: clientName })}
      />
      <Menu mode="horizontal" selectedKeys={[selectedTab]} onSelect={onSelect}>
        {MenuTabs.map((tab: MenuTabProps) => MenuTab(tab))}
      </Menu>
    </>
  );
};

export default CaseMenu;
