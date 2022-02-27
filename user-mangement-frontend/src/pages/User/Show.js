import React, { useMemo } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import {
  ScrollablePane,
  ScrollbarVisibility,
} from '@fluentui/react/lib/ScrollablePane';
import Breadcrumb from 'components/Breadcrumb';
import { useResource } from 'hooks/resources';
import moment from 'moment';
import * as routes from 'constants/routes';
import { DefaultButton } from '@fluentui/react/lib';

function Show({ history, match }) {
  const { id } = match.params;
  const { isLoading, item } = useResource(`users/${id}`);

  const breadcrumbItems = useMemo(() => {
    const items = [
      {
        text: 'User',
        key: 'index',
        onClick: () => history.push(routes.USER),
      },
    ];

    if (item) {
      items.push({
        text: item.name,
        key: 'show',
        isCurrentItem: true,
      });
    }

    return items;
  }, [item, history]);

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
      <Stack className="show-panel">
        <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
          <Stack className="show-panel-button">
            <div className="ms-Grid" dir="ltr">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-lg12 pull-right">
                  <DefaultButton
                    className="primary-btn"
                    text="Back"
                    iconProps={{ iconName: 'Back' }}
                    onClick={() => history.goBack()}
                  />
                </div>
              </div>
            </div>
          </Stack>
          <Stack className="show-panel-data">
            <div className="ms-Grid" dir="ltr">
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-lg2 row-item-label">Name</div>
                <div className="ms-Grid-col ms-lg4 row-item-data">
                  <span>{item?.name}</span>
                </div>
                <div className="ms-Grid-col ms-lg2 row-item-label">Email</div>
                <div className="ms-Grid-col ms-lg4 row-item-data">
                  <span>{item?.email}</span>
                </div>
              </div>
              <div className="ms-Grid-row">
                <div className="ms-Grid-col ms-lg2 row-item-label">Hotal</div>
                <div className="ms-Grid-col ms-lg4 row-item-data">
                  <span>{item?.hotel?.name}</span>
                </div>
                <div className="ms-Grid-col ms-lg2 row-item-label">Created</div>
                <div className="ms-Grid-col ms-lg4 row-item-data">
                  <span>{moment(item?.created_at).format('LL')}</span>
                </div>
              </div>
            </div>
          </Stack>
        </ScrollablePane>
      </Stack>
    </Stack>
  );
}

export default Show;
