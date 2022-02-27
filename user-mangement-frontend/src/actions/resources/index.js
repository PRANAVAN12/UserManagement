import { HTTP_REQUEST } from 'middleware/axios';

export function loadResources(url) {
  return {
    [HTTP_REQUEST]: {
      url: `/${url}`,
      method: 'GET',
    },
  };
}

export function loadResource(url) {
  return {
    [HTTP_REQUEST]: {
      method: 'GET',
      url: `/${url}`,
    },
  };
}

export function deleteResource(url) {
  return {
    [HTTP_REQUEST]: {
      method: 'DELETE',
      url: `/${url}`,
    },
  };
}
