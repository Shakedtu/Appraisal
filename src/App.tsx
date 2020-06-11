import React, {lazy, Suspense} from 'react';
import './App.scss';
import { Layout, Typography } from 'antd'
import { useTranslation } from 'react-i18next';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import CaseTable from './components/CaseTable/caseTable';
import Case from "./components/Case/Case";
import {AppPage, PagesRoutes} from "./components/AppRouter/AppRouterConst";


const App = () => {
  const { t } = useTranslation();
  const { Header, Content } = Layout;
  const { Title } = Typography;

    const Pages: AppPage[] = [
        {
            id: 'caseTable',
            path: PagesRoutes.caseTable,
            component: lazy(() => import(/* webpackPreload: true */ './components/CaseTable/caseTable'))
        },
        {
            id: 'contactInfo',
            path: PagesRoutes.contactInfo,
            component: lazy(() => import(/* webpackPrefetch: true */ './components/Case/ContactInfo/ContactInfo'))
        }
    ]

  return (
    <div className="App">
      <Header>
        <Title>{t('header.title')}</Title>
      </Header>
      <Content>
          <BrowserRouter>
              <Suspense fallback={<div>loading</div>}>
                  <Switch>
                      {Pages.map(appPage => (
                          <Route
                              exact
                              key={appPage.id}
                              path={appPage.path}
                              component={appPage.component}
                          />
                      ))}
                  </Switch>
              </Suspense>
          </BrowserRouter>
      </Content>
    </div>
  )
};

export default App;