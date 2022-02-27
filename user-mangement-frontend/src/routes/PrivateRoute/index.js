import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { Stack } from '@fluentui/react/lib/Stack';
import { isAuthorized } from 'selectors/auth';
import * as routes from 'constants/routes';
import SideBar from 'components/SideBar';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Loader from '../Loader';

function PrivateRoute({ component: Component, ...props }) {
  const authorized = useSelector(isAuthorized);

  return (
    <Route
      {...props}
      render={(renderProps) => {
        if (authorized) {
          return (
            <Stack styles={{ root: { flex: 1 } }}>
              <Header />
              <Stack styles={{ root: { flex: 1 } }}>
                <Stack horizontal styles={{ root: { flex: 1 } }}>
                  <SideBar />
                  <Suspense fallback={Loader}>
                    <Component {...renderProps} />
                  </Suspense>
                </Stack>
              </Stack>
              <Footer />
            </Stack>
          );
        }

        return (
          <Redirect
            to={{
              pathname: routes.LOGIN,
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
}

PrivateRoute.propTypes = {
  path: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  location: PropTypes.object,
  component: PropTypes.shape({
    render: PropTypes.func,
  }),
};

export default PrivateRoute;
