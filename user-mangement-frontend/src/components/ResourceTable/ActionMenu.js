import React, { useState, useMemo } from 'react';
import { IconButton } from '@fluentui/react/lib/Button';
import { ContextualMenuItemType } from '@fluentui/react/lib/ContextualMenu';
import DeleteItem from './DeleteItem';

function ActionMenu({
  item,
  onView,
  onEdit,
  onDelete,
  deleteUrl,
  disableAction,
  disableActions,
}) {
  const [hiddenDeleteDialog, setHiddenDeleteDialog] = useState(true);

  const items = useMemo(() => {
    const items = [
      {
        key: `actions-123`,
        itemType: ContextualMenuItemType.Header,
        text: 'Actions',
        itemProps: {
          lang: 'en-us',
        },
      },
    ];

    if (onView && !(disableActions && disableActions.view)) {
      items.push({
        text: 'View',
        key: 'view',
        title: 'View the item',
        onClick: () => onView(false),
        iconProps: {
          iconName: 'View',
          style: {
            color: 'Aquamarine',
          },
        },
      });
    }

    if (onEdit && !(disableActions && disableActions.edit)) {
      items.push({
        text: 'Edit',
        key: 'edit',
        title: 'Edit the item',
        onClick: () => onEdit(item),
        iconProps: {
          iconName: 'Edit',
        },
      });
    }

    if (onDelete && !(disableActions && disableActions.delete)) {
      items.push({
        text: 'Delete',
        key: 'delete',
        title: 'Delete the item',
        onClick: () => setHiddenDeleteDialog(false),
        iconProps: {
          iconName: 'Delete',
          style: {
            color: 'salmon',
          },
        },
      });
    }

    return items;
  }, [item, onView, onEdit, onDelete, disableActions]);

  return (
    <>
      {!disableAction && (
        <>
          <IconButton
            menuProps={{
              items,
              shouldFocusOnMount: true,
            }}
            iconProps={{
              iconName: 'More',
            }}
          />
          <DeleteItem
            url={deleteUrl}
            hidden={hiddenDeleteDialog}
            onHidden={setHiddenDeleteDialog}
            onDelete={() => {
              setHiddenDeleteDialog(true);
              onDelete();
            }}
          />
        </>
      )}
    </>
  );
}

export default ActionMenu;
