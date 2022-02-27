import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from 'routes';
import Welcome from 'pages/Welcome';
import useStore, { history } from 'store';
import ErrorBoundary from './ErrorBoundary';

function App() {
  const { store, persist, isReady } = useStore();

  if (!isReady) {
    return <Welcome />;
  }

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate persistor={persist}>
          <Routes history={history} />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
