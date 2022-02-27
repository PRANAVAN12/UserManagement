import { logout } from 'actions/auth';
import { getAccessToken, getTokenType } from 'selectors/auth';

/**
 * Axios request identifier
 * @type {string}
 */
export const HTTP_REQUEST = 'HTTP_REQUEST';

/**
 * Axios middleware
 * Create request using given client
 * Use action identifier options to process request
 */
function createMiddleware(client) {
  return ({ dispatch, getState }) =>
    (next) =>
    (action) => {
      const { [HTTP_REQUEST]: options, ...nextAction } = action;

      if (!options) {
        return next(action);
      }

      let Authorization;
      if (options.useAuth !== false) {
        const state = getState();
        Authorization = `${getTokenType(state)} ${getAccessToken(state)}`;
      }

      // Add request interceptor
      const {
        onSuccess,
        onError,
        onUploadProgress,
        onDownloadProgress,
        ...requestConfig
      } = options;
      if (Authorization) {
        client.defaults.headers.common.Authorization = Authorization;
      }

      if (action.type) {
        next(nextAction);
      }

      if (onUploadProgress) {
        requestConfig.onUploadProgress = (event) => {
          const progressAction = onUploadProgress(event, getState, dispatch);
          if (progressAction) {
            dispatch(progressAction);
          }
        };
      }

      if (onDownloadProgress) {
        requestConfig.onDownloadProgress = (event) => {
          const progressAction = onDownloadProgress(event, getState, dispatch);
          if (progressAction) {
            dispatch(progressAction);
          }
        };
      }

      return client
        .request(requestConfig)
        .then((response) => {
          if (options.onSuccess) {
            dispatch(onSuccess(response, getState, dispatch));
          }
          return response;
        })
        .catch((error) => {
          if (error.message === 'Unauthenticated.') {
            dispatch(logout());
          }

          if (options.onError) {
            dispatch(onError(error, getState, dispatch));
          }

          return Promise.reject(error);
        });
    };
}

export default createMiddleware;
