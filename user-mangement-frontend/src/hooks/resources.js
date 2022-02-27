import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadResource } from 'actions/resources';

export function useResource(url) {
  const dispatch = useDispatch();
  const [item, setItem] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const onLoad = async () => {
      setLoading(true);

      try {
        const response = await dispatch(loadResource(url));
        setItem(response.data);
      } catch (e) {}

      setLoading(false);
    };

    onLoad();
  }, [url, dispatch]);

  return { isLoading, item };
}
