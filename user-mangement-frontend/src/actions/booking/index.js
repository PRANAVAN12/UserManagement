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

export function CancelItem(id) {
  return {
    [HTTP_REQUEST]: {
      method: 'PATCH',
      url: `bookings/${id}/cancel`,
    },
  };
}

export function payment(id, values) {
  return {
    [HTTP_REQUEST]: {
      method: 'PATCH',
      url: `bookings/${id}/payment`,
      data: values,
    },
  };
}
