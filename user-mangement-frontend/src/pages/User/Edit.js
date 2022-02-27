import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Stack } from '@fluentui/react/lib/Stack';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import Breadcrumb from 'components/Breadcrumb';
import { useResource } from 'hooks/resources';
import { updateItem } from 'actions/user';
import { USER, USER_SHOW } from 'constants/routes';
import Form from './Form';
import toast from 'lib/toast';
import { USER_UPDATE_SUCCESS } from 'constants/messages';

function Edit({ history, match }) {
  const dispatch = useDispatch();
  const { id } = match.params;
  const { isLoading, item } = useResource(`users/${id}`);

  const breadcrumbItems = useMemo(() => {
    const items = [
      {
        text: 'User',
        key: 'index',
        onClick: () => history.push(USER),
      },
    ];

    if (item) {
      items.push(
        {
          key: 'show',
          text: item.name,
          onClick: () => history.push(USER_SHOW.replace(':id', item.id)),
        },
        {
          text: 'Edit',
          key: 'edit',
          isCurrentItem: true,
        },
      );
    }

    return items;
  }, [item, history]);

  const onUpdate = useCallback(
    async (values, actions) => {
      actions.setSubmitting(true);
      delete values.hotel;
      try {
        const responce = await dispatch(updateItem(id, values));
        if (responce.success) {
          toast.success(USER_UPDATE_SUCCESS);
          history.push(USER);
        }
      } catch (e) {
        if (e.errors) {
          actions.setErrors(e.errors);
        }
        actions.setSubmitting(false);
      }
    },
    [dispatch, history, id],
  );

  if (isLoading) {
    return (
      <Stack styles={{ root: { flex: 1, justifyContent: 'center' } }}>
        <Spinner label="Loading..." size={SpinnerSize.large} />
      </Stack>
    );
  }

  if (!item) {
    return null;
  }

  return (
    <Stack className="inner-page-panel">
      <Stack>
        <Breadcrumb items={breadcrumbItems} />
      </Stack>
      <Stack className="form-panel">
        <Form onSubmit={onUpdate} item={item} buttonText="Update" />
      </Stack>
    </Stack>
  );
}

export default Edit;
