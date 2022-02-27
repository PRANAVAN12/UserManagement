import { HTTP_REQUEST } from 'middleware/axios';

export function searchItems(url) {
  return {
    [HTTP_REQUEST]: {
      url: url,
      method: 'GET',
    },
  };
}
