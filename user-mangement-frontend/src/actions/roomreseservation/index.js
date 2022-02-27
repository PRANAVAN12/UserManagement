import { HTTP_REQUEST } from 'middleware/axios';

export function storeItem(values) {
  return {
    [HTTP_REQUEST]: {
      method: 'POST',
      url: 'bookings',
      data: values,
    },
  };
}

export function updateItem(id, values) {
  return {
    [HTTP_REQUEST]: {
      method: 'PATCH',
      url: `bookings/${id}`,
      data: values,
    },
  };
}
