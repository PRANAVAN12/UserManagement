import { PURGE } from 'redux-persist';
// Internal imports
import appReducer from './appReducer';

function rootReducer(history) {
  // create reducers
  const reducers = appReducer(history);

  return (state, action) => {
    // Reset current state and
    // re initiate application states
    if (action.type === PURGE) {
      return reducers(undefined, action);
    }

    // default state handle with application reducers
    return reducers(state, action);
  };
}

export default rootReducer;
