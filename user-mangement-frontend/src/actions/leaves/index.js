import { HTTP_REQUEST } from 'middleware/axios';

export function storeItem(values) {
  return {
    [HTTP_REQUEST]: {
      method: 'POST',
      url: 'leaves',
      data: values,
    },
  };
}

export function updateItem(id, values) {
  return {
    [HTTP_REQUEST]: {
      method: 'PATCH',
      url: `leaves/${id}`,
      data: values,
    },
  };
}
export function CancelStatus(id, status) {
  return {
    [HTTP_REQUEST]: {
      method: 'PATCH',
      url: `leaves/${id}/change-status`,
      data: {
        status: status,
      },
    },
  };
}
