import { HTTP_REQUEST } from 'middleware/axios';

export function loadReport(params) {
  return {
    [HTTP_REQUEST]: {
      method: 'GET',
      url: `/reports/sales?${params}`,
    },
  };
}
