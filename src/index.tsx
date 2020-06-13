import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd';
import * as serviceWorker from './serviceWorker';
import './i18n';
import heIL from 'antd/es/locale/he_IL';
import Login from './login';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={heIL} direction="rtl">
      <Login />
      <App />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
