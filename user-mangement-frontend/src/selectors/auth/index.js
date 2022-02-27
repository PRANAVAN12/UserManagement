import moment from 'moment';
import jwtDecode from 'jwt-decode';
import { createSelector } from 'reselect';

const auth = (state) => state.auth;

export const getAccessToken = createSelector(
  auth,
  ({ accessToken }) => accessToken,
);

export const getUser = createSelector(auth, ({ user }) => user);

export const getTokenType = createSelector(auth, (token) =>
  token ? token.tokenType : null,
);

export const getDecodedToken = createSelector(getAccessToken, (token) =>
  token ? jwtDecode(token) : null,
);

export const getExpiresIn = createSelector(getDecodedToken, (token) =>
  token ? moment.unix(token.exp) : null,
);

export const isTokenValid = createSelector(getExpiresIn, (expires) =>
  expires ? expires.isSameOrAfter(moment()) : false,
);

export const isAuthorized = createSelector(
  [getUser, isTokenValid],
  (user, expired) => (user && user.id ? expired : false),
);
