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
  CONTACT_INFO = 'contact-info',
  MORE_INFO = 'more-info',
  BILL_INFO = 'bill-info',
  DOCUMENTS = 'documents',
}
interface CaseMenuProps {
  selectedTab: CaseMenuTabs;
  onSelect;
  caseDoc;
}

const CaseMenu: FunctionComponent<CaseMenuProps> = ({
  selectedTab,
  onSelect,
  caseDoc
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const onBack = () => history.goBack();
  const MenuTabs: MenuTabProps[] = [
    {
      key: CaseMenuTabs.CONTACT_INFO,
      icon: <SolutionOutlined />,
      text: t('case.menu.item.contact-info'),
    },
    {
      key: CaseMenuTabs.MORE_INFO,
      icon: <SolutionOutlined />,
      text: t('case.menu.item.more-info'),
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
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={onBack}
        title={t('case.header.title', { name: caseDoc.client.name })}
      />
      <Menu mode="horizontal" selectedKeys={[selectedTab]} onSelect={onSelect}>
        {MenuTabs.map((tab) => MenuTab(tab))}
      </Menu>
    </>
  );
};

export default CaseMenu;
