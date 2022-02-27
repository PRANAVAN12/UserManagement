import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from '../Loader';

function LazyRoute({ component: Component, ...props }) {
  return (
    <Route
      {...props}
      render={renderProps => (
        <Suspense fallback={Loader}>
          <Component {...renderProps} />
        </Suspense>
      )}
    />
  );
}

LazyRoute.propTypes = {
  component: PropTypes.shape({
    render: PropTypes.func,
  }),
};

export default LazyRoute;
