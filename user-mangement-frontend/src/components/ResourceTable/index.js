import React, { useMemo, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import pick from 'lodash-es/pick';
import {
  SelectionMode,
  ConstrainMode,
  CheckboxVisibility,
} from '@fluentui/react/lib/DetailsList';
import {
  ScrollablePane,
  ScrollbarVisibility,
} from '@fluentui/react/lib/ScrollablePane';
import { Stack } from '@fluentui/react/lib/Stack';
import { Sticky, StickyPositionType } from '@fluentui/react/lib/Sticky';
import { ShimmeredDetailsList } from '@fluentui/react/lib/ShimmeredDetailsList';
import { MessageBar, MessageBarType } from '@fluentui/react';
import { urlSearch, searchRoute } from 'lib/helpers';

import ActionMenu from './ActionMenu';
import Pagination from './Pagination';
import { useResources } from './hooks';

function ResourceTable({
  url,
  name,
  columns,
  deleteUrl,
  editRoute,
  viewRoute,
  disableAction,
  disableActions,
  location,
  history,
  onRenderIcons,
}) {
  const resourceParams = useMemo(() => {
    return {
      size: name ? `${name}-size` : 'size',
      page: name ? `${name}-page` : 'page',
      query: name ? `${name}-query` : 'query',
    };
  }, [name]);

  const resourceValues = useMemo(() => {
    return pick(urlSearch(location.search), Object.values(resourceParams));
  }, [resourceParams, location]);

  const { items, onChange, isLoading, pagination } = useResources({
    url,
    resourceValues,
  });

  const resourceColumns = useMemo(() => {
    let items = [...columns];
    if (!disableAction) {
      items.push({
        key: 'actions',
        name: 'Actions',
        isRowHeader: false,
        isResizable: false,
        minWidth: 100,
        maxWidth: 300,
        isSorted: false,
        data: 'object',
        isPadded: true,
        onRender: (item) =>
          onRenderIcons ? (
            onRenderIcons(item)
          ) : (
            <ActionMenu
              item={item}
              disableAction={disableAction}
              disableActions={disableActions}
              onView={() => history.push(viewRoute(item))}
              onEdit={() => history.push(editRoute(item))}
              onDelete={() => onChange(items.filter((i) => i.id !== item.id))}
              deleteUrl={deleteUrl ? deleteUrl(item) : null}
            />
          ),
      });
    }
    return items;
  }, [
    items,
    history,
    columns,
    onChange,
    deleteUrl,
    viewRoute,
    editRoute,
    disableAction,
    disableActions,
    onRenderIcons,
  ]);

  const onPaginate = useCallback(
    (page) => {
      history.push(
        searchRoute(
          location,
          {
            [resourceParams.page]: page,
            [resourceParams.size]: 15,
          },
          false,
        ),
      );
    },
    [history, location, resourceParams],
  );

  return (
    <Stack
      styles={{
        root: {
          flex: 1,
          width: '100%',
          background: '#fff',
        },
      }}>
      <Stack styles={{ root: { height: '100%', position: 'relative' } }}>
        <ScrollablePane
          scrollbarVisibility={ScrollbarVisibility.auto}
          styles={{ root: { height: '100%' } }}>
          <ShimmeredDetailsList
            items={items}
            setKey={url}
            shimmerLines={13}
            columns={resourceColumns}
            enableShimmer={isLoading}
            enterModalSelectionOnTouch
            selectionPreservedOnEmptyClick
            selectionMode={SelectionMode.none}
            constrainMode={ConstrainMode.unconstrained}
            checkboxVisibility={CheckboxVisibility.hidden}
            onRenderDetailsHeader={(headerProps, defaultRender) => {
              return (
                <Sticky stickyPosition={StickyPositionType.Header}>
                  {defaultRender(headerProps)}
                  {!isLoading && items.length === 0 ? (
                    <MessageBar
                      styles={{
                        root: {
                          marginBottom: '-16px',
                        },
                      }}
                      messageBarType={MessageBarType.warning}
                      dismissButtonAriaLabel="Close">
                      No Records Found...
                    </MessageBar>
                  ) : null}
                </Sticky>
              );
            }}
            onRenderDetailsFooter={() => {
              if (
                pagination.currentPage &&
                pagination.currentPage <= pagination.lastPage
              ) {
                return (
                  <Sticky stickyPosition={StickyPositionType.Footer}>
                    <Pagination
                      {...pagination}
                      onChange={onPaginate}
                      currentPage={parseFloat(
                        resourceValues[resourceParams.page] ||
                          pagination.currentPage,
                      )}
                    />
                  </Sticky>
                );
              }
            }}
          />
        </ScrollablePane>
      </Stack>
    </Stack>
  );
}
export default withRouter(ResourceTable);
