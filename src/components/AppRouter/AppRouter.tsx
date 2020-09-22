import React, { LazyExoticComponent } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppPage } from './AppRouterConst';
import uid from 'uid';

interface AppRouterProps {
  appPages: AppPage[];
}

const AppRouter: React.FunctionComponent<AppRouterProps> = ({ appPages }) => {
  return (
    <BrowserRouter>
      <Switch>
        {appPages.map((appPage) => (
          <Route exact {...appPage} key={uid()} />
        ))}
      </Switch>
    </BrowserRouter>
  );
};

export { AppRouter as default };
