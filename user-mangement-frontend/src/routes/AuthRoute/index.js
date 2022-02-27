import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as routes from 'constants/routes';
import { resolveRedirect } from 'lib/helpers';
import { isAuthorized } from 'selectors/auth';
import Loader from '../Loader';

function AuthRoute({ component: Component, ...props }) {
  const authorized = useSelector(isAuthorized);

  return (
    <Route
      {...props}
      render={(renderProps) => {
        if (!authorized) {
          return (
            <Suspense fallback={Loader}>
              <Component {...renderProps} />
            </Suspense>
          );
        }

        const redirect = resolveRedirect(props.location.hash);
        if (redirect && redirect !== props.location.pathname) {
          return (
            <Redirect
              to={{
                pathname: redirect,
                state: { from: props.location },
              }}
            />
          );
        }

        return (
          <Redirect
            to={{
              pathname: routes.HOME,
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
}

AuthRoute.propTypes = {
  path: PropTypes.string,
  location: PropTypes.object,
  component: PropTypes.shape({
    render: PropTypes.func,
  }),
};

export default AuthRoute;
