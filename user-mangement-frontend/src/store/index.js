import { useEffect, useMemo, useRef, useState } from 'react';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';

export const history = createBrowserHistory();

function useStore() {
  const alive = useRef(true);
  const [store, setStore] = useState(null);
  const [persist, setPersist] = useState(null);

  useEffect(() => {
    const createStore = async () => {
      try {
        const { store, persist } = await configureStore(history);
        if (alive.current) {
          setStore(store);
          setPersist(persist);
        }
      } catch (e) {
        // handle error
      }
    };

    createStore();
    return () => {
      alive.current = false;
    };
  }, []);

  /**
   * Check the store created successfully
   * @type {boolean}
   */
  const isReady = useMemo(() => {
    return store !== null && persist !== null;
  }, [store, persist]);

  return { store, persist, isReady };
}

export default useStore;
