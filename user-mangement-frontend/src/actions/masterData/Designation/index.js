import { HTTP_REQUEST } from 'middleware/axios';

export function storeItem(values) {
  return {
    [HTTP_REQUEST]: {
      method: 'POST',
      url: 'designations',
      data: values,
    },
  };
}

export function updateItem(id, values) {
  return {
    [HTTP_REQUEST]: {
      method: 'PATCH',
      url: `designations/${id}`,
      data: values,
    },
  };
}
