import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import CaseTable from '../components/CaseTable/CaseTable';
import Endpoint from '../components/TestEndpoints';

const MenuItemsContent = {
  "1": <CaseTable />,
  "2": <Endpoint />
};


const Dashboard = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { Sider, Content } = Layout;
  const [currentKey, setCurrentKey] = useState("1");
  const onSelectedItem = ({ key }) => setCurrentKey(key);

  if (!sessionStorage.getItem('token'))
    history.push('/login');
  return (
    <Layout>
      <Sider>
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          onSelect={onSelectedItem}>
          <Menu.Item key="1">
            {t('dashboard.item.case-table')}
          </Menu.Item>
          <Menu.Item key="2">
            tests
          </Menu.Item>
        </Menu>
      </Sider>
      <Content>
        {MenuItemsContent[currentKey]}
      </Content>
    </Layout>
  );
};

export default Dashboard;
