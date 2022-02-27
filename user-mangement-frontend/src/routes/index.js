import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'connected-react-router';
import Routes from './Routes';

function Router({ history }) {
  history.listen((location) => {
    // Use setTimeout to make sure this runs after React Router's own listener
    setTimeout(() => {
      // Keep default behavior of restoring scroll position when user:
      // - clicked back button
      // - clicked on a link that programmatically calls `history.goBack()`
      // - manually changed the URL in the address bar (here we might want
      // to scroll to top, but we can't differentiate it from the others)
      if (location.action !== 'POP') {
        // In all other cases, scroll to top
        window.scrollTo(0, 0);
      }
    });
  });

  return (
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  );
}

Router.propTypes = {
  history: PropTypes.shape({
    action: PropTypes.string,
  }),
};

export default Router;
