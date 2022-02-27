import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { deleteResource } from 'actions/resources';

function DeleteItem({ url, hidden, onDelete, onHidden }) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  const handleDelete = useCallback(async () => {
    setLoading(true);
    try {
      await dispatch(deleteResource(url));
      onDelete();
    } catch (e) {
      setLoading(false);
    }
  }, [url, onDelete, dispatch]);

  return (
    <Dialog
      hidden={hidden}
      onDismiss={() => onHidden(true)}
      modalProps={{
        isBlocking: false,
        styles: { main: { maxWidth: 450 } },
      }}
      dialogContentProps={{
        title: 'Delete item.',
        type: DialogType.largeHeader,
        subText: 'Are you sure to delete this item.',
      }}>
      <DialogFooter>
        <PrimaryButton
          disabled={isLoading}
          onClick={handleDelete}
          text={isLoading ? 'Deleting...' : 'Delete'}
        />
        <DefaultButton
          text="Cancel"
          disabled={isLoading}
          onClick={() => onHidden(true)}
        />
      </DialogFooter>
    </Dialog>
  );
}

export default DeleteItem;
