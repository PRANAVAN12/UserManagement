import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { connectRouter } from 'connected-react-router';
// App level imports
import { authToken } from 'config/persist';
// Internal imports
import authReducer from './auth';

const appReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth: persistReducer(authToken, authReducer),
  });
export default appReducer;
