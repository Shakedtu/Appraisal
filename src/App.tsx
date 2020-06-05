import React from 'react';
import './App.css';
import { Button } from 'antd'
import { useTranslation } from 'react-i18next';


const App = () => {
  const { t } = useTranslation();
  return (
    <div className="App">
      <Button type="primary">{t('button')}</Button>
    </div>
  )
};

export default App;