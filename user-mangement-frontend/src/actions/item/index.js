import { HTTP_REQUEST } from 'middleware/axios';

export function storeItem(values) {
  return {
    [HTTP_REQUEST]: {
      method: 'POST',
      url: 'items',
      data: values,
    },
  };
}

export function updateItem(id, values) {
  return {
    [HTTP_REQUEST]: {
      method: 'PATCH',
      url: `items/${id}`,
      data: values,
    },
  };
}
