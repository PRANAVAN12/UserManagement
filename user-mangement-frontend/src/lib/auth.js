import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPermission } from 'selectors/auth';
import includes from 'lodash-es/includes';

export function useAllowed(action, model) {
  const permissions = useSelector(getPermission);

  const isAllowed = useCallback(() => {
    return includes(permissions[model], action);
  }, []);

  useEffect(() => {
    isAllowed();
  }, [isAllowed]);

  return { isAllowed };
}
