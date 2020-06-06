import React from 'react';
import './App.scss';
import { Layout, Typography } from 'antd'
import { useTranslation } from 'react-i18next';
import FileTable from './components/FileLIst/fileTable';


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
        <FileTable />
      </Content>
    </div>
  )
};

export default App;