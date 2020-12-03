import React, { lazy, Suspense } from 'react';
import './App.scss';
import { Layout, Typography, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppPage, PagesRoutes } from './components/AppRouter/AppRouterConst';
import {
  ReactQueryCacheProvider,
  useQueryCache,
  QueryCache,
} from 'react-query';

const queryCache = new QueryCache();

const App = () => {
  const { t } = useTranslation();
  const { Header, Content } = Layout;
  const { Title } = Typography;
  const Pages: AppPage[] = [
    {
      key: 'home',
      path: PagesRoutes.HOME,
      component: lazy(() =>
        import(/* webpackPreload: true */ './components/Dashboard')
      ),
    },
    {
      key: 'login',
      path: PagesRoutes.LOGIN,
      component: lazy(() =>
        import(/* webpackPreload: true */ './components/Login')
      ),
    },
    {
      key: 'caseTable',
      path: PagesRoutes.CASE_TABLE,
      component: lazy(() =>
        import(/* webpackPrefetch: true */ './components/CaseTable/CaseTable')
      ),
    },
    {
      key: 'case',
      path: PagesRoutes.CASE,
      component: lazy(() =>
        import(/* webpackPrefetch: true */ './components/Case/Case')
      ),
    },
    {
      key: 'test',
      path: PagesRoutes.TEST_ENDPOINTS,
      component: lazy(() =>
        import(/* webpackPreload: true */ './components/TestEndpoints')
      ),
    },
  ];

  return (
    <div className="App">
      <Header>
        <Title code style={{ color: 'white' }}>
          {t('header.title')}
        </Title>
      </Header>
      <Content>
        <BrowserRouter>
          <Suspense fallback={<Spin />}>
            <ReactQueryCacheProvider queryCache={queryCache}>
              <Switch>
                {Pages.map((page: AppPage) => (
                  <Route exact {...page} />
                ))}
              </Switch>
            </ReactQueryCacheProvider>
          </Suspense>
        </BrowserRouter>
      </Content>
    </div>
  );
};

export default App;
