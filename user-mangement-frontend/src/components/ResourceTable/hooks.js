import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import camelcaseKeys from 'camelcase-keys';
import { urlStringify } from 'lib/helpers';
import { loadResources } from 'actions/resources';

export function useResources({ url, resourceValues }) {
  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});

  const onChange = useCallback((items) => {
    setItems(items);
  }, []);

  const onLoadItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await dispatch(
        loadResources(`${url}?${urlStringify(resourceValues)}`),
      );
      if (response.data) {
        setItems(response.data);
        setPagination(camelcaseKeys(response.meta));
      } else {
        setItems([]);
        setPagination({});
      }
    } catch (e) {}
    setLoading(false);
  }, [dispatch, url, resourceValues]);

  useEffect(() => {
    onLoadItems();
  }, [resourceValues, onLoadItems]);

  return { items, isLoading, onChange, pagination };
}
