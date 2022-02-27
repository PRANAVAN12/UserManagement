import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Stack } from '@fluentui/react/lib/Stack';
import Breadcrumb from 'components/Breadcrumb';
import { storeItem } from 'actions/user';
import * as routes from 'constants/routes';
import Form from './Form';
import toast from 'lib/toast';
import { USER_CREATE_SUCCESS } from 'constants/messages';

function Create({ history }) {
  const dispatch = useDispatch();

  const breadcrumbItems = [
    {
      text: 'Users',
      key: 'index',
      onClick: () => history.push(routes.USER),
    },
    {
      text: 'Create',
      key: 'create',
      isCurrentItem: true,
    },
  ];

  const onStore = useCallback(
    async (values, actions) => {
      delete values.hotel;
      actions.setSubmitting(true);
      try {
        await dispatch(storeItem(values));
        toast.success(USER_CREATE_SUCCESS);
        history.push(routes.USER);
      } catch (e) {
        if (e.errors) {
          actions.setErrors(e.errors);
        }
        actions.setSubmitting(false);
      }
    },
    [dispatch, history],
  );

  return (
    <Stack className="inner-page-panel">
      <Stack>
        <Breadcrumb items={breadcrumbItems} />
      </Stack>
      <Stack className="form-panel">
        <Form onSubmit={onStore} buttonText="Submit" />
      </Stack>
    </Stack>
  );
}

export default Create;
