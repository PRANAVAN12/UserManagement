import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { persistReducer, persistStore } from 'redux-persist';
import { applyMiddleware, compose, createStore } from 'redux';
import axios from 'lib/axios';
import { root } from 'config/persist';
import createRootReducer from 'reducers';
import createAxiosMiddleware from 'middleware/axios';

export const history = createBrowserHistory();

/**
 * Create store instance
 *
 * @return {Promise<Object>}
 */
async function configureStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const middlewares = [
    thunk,
    createAxiosMiddleware(axios),
    routerMiddleware(history),
  ];

  const store = createStore(
    createRootReducer(history),
    composeEnhancers(applyMiddleware(...middlewares)),
  );

  const persist = await persistStore(store);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      // This fetch the new state of the above reducers.
      const nextRootReducer = import('../reducers');
      store.replaceReducer(persistReducer(root, nextRootReducer));
    });
  }

  return { store, persist };
}

export default configureStore;
