import { PURGE } from 'redux-persist';
import { HTTP_REQUEST } from 'middleware/axios';
import * as actionTypes from './actionTypes';
import { authUrl } from 'config/env';

export function login(values) {
  return {
    [HTTP_REQUEST]: {
      method: 'POST',
      baseURL: authUrl,
      data: {
        email: values.username,
        password: values.password,
      },
      onSuccess: (response) => {
        return {
          response,
          type: actionTypes.LOGIN_SUCCESS,
        };
      },
    },
  };
}

export function loadUser() {
  return {
    [HTTP_REQUEST]: {
      method: 'GET',
      url: 'auth/user',
      onSuccess: (response) => {
        return {
          response,
          type: actionTypes.AUTH_USER_LOADED,
        };
      },
    },
  };
}

export function logout() {
  return {
    type: PURGE,
    result: () => null,
  };
}
