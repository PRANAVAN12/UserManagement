import React, { lazy } from 'react';
import { Switch } from 'react-router-dom';
import Loader from './Loader';
import * as routes from 'constants/routes';
import AuthRoute from './AuthRoute';
import PrivateRoute from './PrivateRoute';

function Routes() {
  return (
    <Switch>
      <AuthRoute
        exact
        fallback={Loader}
        path={routes.LOGIN}
        component={lazy(() => import('pages/Auth/Login'))}
      />
      <PrivateRoute
        exact
        fallback={Loader}
        path={routes.HOME}
        component={lazy(() => import('pages/Home'))}
      />
  
     

      <PrivateRoute
        exact
        model="User"
        method="index"
        path={routes.USER}
        component={lazy(() => import('pages/User'))}
      />
      <PrivateRoute
        exact
        model="User"
        method="create"
        path={routes.USER_CREATE}
        component={lazy(() => import('pages/User/Create'))}
      />
      <PrivateRoute
        exact
        model="User"
        method="edit"
        path={routes.USER_EDIT}
        component={lazy(() => import('pages/User/Edit'))}
      />
      <PrivateRoute
        exact
        model="User"
        method="show"
        path={routes.USER_SHOW}
        component={lazy(() => import('pages/User/Show'))}
      />
     
    </Switch>
  );
}

export default Routes;
