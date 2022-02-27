import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, loadUser } from 'actions/auth';

export function useLogin() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);

  const onLogin = useCallback(
    async (values, actions) => {
      actions.setSubmitting(true);
      try {
        await dispatch(login(values));
        await dispatch(loadUser());
      } catch (e) {
        if (e.errors) {
          actions.setErrors(e.errors);
          setErrorMessage(e.errors);
        }
        actions.setSubmitting(false);
      }
    },
    [dispatch],
  );
  return { onLogin, errorMessage, setErrorMessage };
}
