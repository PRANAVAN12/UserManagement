import { HTTP_REQUEST } from 'middleware/axios';

export function storeItem(values) {
  return {
    [HTTP_REQUEST]: {
      method: 'POST',
      url: 'sales',
      data: values,
    },
  };
}

export function CancelItem(id) {
  return {
    [HTTP_REQUEST]: {
      method: 'PATCH',
      url: `sales/${id}/cancel`,
    },
  };
}

export function payment(id, values) {
  return {
    [HTTP_REQUEST]: {
      method: 'PATCH',
      url: `sales/${id}/payment`,
      data: values,
    },
  };
}
