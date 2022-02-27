import camelKeys from 'camelcase-keys';
import * as actionTypes from 'actions/auth/actionTypes';

const initialState = {
  accessToken: null,
  refreshToken: null,
  tokenType: 'Bearer',
  user: {
    id: null,
    name: null,
    email: null,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        ...camelKeys(action.response),
      };
    case actionTypes.AUTH_USER_LOADED:
      return {
        ...state,
        user: {
          id: action.response.id,
          name: action.response.name,
          email: action.response.email,
        },
      };
    default:
      return state;
  }
};
