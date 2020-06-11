import React, {LazyExoticComponent} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {AppPage} from "./AppRouterConst";


interface AppRouterProps {
    appPages: AppPage[];
}

const AppRouter: React.FunctionComponent<AppRouterProps> = ({appPages}) => {
    return (
        <BrowserRouter>
            <Switch>
                {appPages.map(appPage => (
                    <Route
                        exact
                        key={appPage.id}
                        path={appPage.path}
                        component={appPage.component}
                    />
                ))}
            </Switch>
        </BrowserRouter>
    )
}

export {AppRouter as default};