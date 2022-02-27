import { HTTP_REQUEST } from 'middleware/axios';

export function storeItem(values) {
  return {
    [HTTP_REQUEST]: {
      method: 'POST',
      url: 'rooms',
      data: values,
    },
  };
}

export function updateItem(id, values) {
  return {
    [HTTP_REQUEST]: {
      method: 'PATCH',
      url: `rooms/${id}`,
      data: values,
    },
  };
}

export function allrooms() {
  return {
    [HTTP_REQUEST]: {
      method: 'GET',
      url: `rooms/all`,
    },
  };
}
