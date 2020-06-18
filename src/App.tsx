import React, { lazy, Suspense } from 'react';
import './App.scss';
import { Layout, Typography, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppPage, PagesRoutes } from './components/AppRouter/AppRouterConst';

const App = () => {
  const { t } = useTranslation();
  const { Header, Content } = Layout;
  const { Title } = Typography;

  const Pages: AppPage[] = [
    {
      id: 'home',
      path: PagesRoutes.HOME,
      component: lazy(() =>
        import(/* webpackPreload: true */ './components/Login')
      ),
    },
    {
      id: 'caseTable',
      path: PagesRoutes.CASE_TABLE,
      component: lazy(() =>
        import(/* webpackPrefetch: true */ './components/CaseTable/CaseTable')
      ),
    },
    {
      id: 'case',
      path: PagesRoutes.CASE,
      component: lazy(() =>
        import(/* webpackPrefetch: true */ './components/Case/Case')
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
            <Switch>
              {Pages.map(({ id, path, component }: AppPage) => (
                <Route exact key={id} path={path} component={component} />
              ))}
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Content>
    </div>
  );
};

export default App;
