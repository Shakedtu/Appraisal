import React from 'react';
import './App.scss';
import { Layout, Typography } from 'antd'
import { useTranslation } from 'react-i18next';
import CaseTable from './components/CaseTable/caseTable';
import Case from "./components/Case/Case";


const App = () => {
  const { t } = useTranslation();
  const { Header, Content } = Layout;
  const { Title } = Typography;
  return (
    <div className="App">
      <Header>
        <Title>{t('header.title')}</Title>
      </Header>
      <Content>
          <CaseTable />
          <Case />
      </Content>
    </div>
  )
};

export default App;