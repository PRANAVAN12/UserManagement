import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import Breadcrumb from 'components/Breadcrumb';
import ResourceTable from 'components/ResourceTable';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { CommandButton } from '@fluentui/react';
import { searchRoute } from 'lib/helpers';
import * as routes from 'constants/routes';
import moment from 'moment';

const breadcrumbItems = [
 
  {
    text: 'Users',
    key: 'index',
    isCurrentItem: true,
  },
];

export const columns = [
  {
    key: 'id',
    name: 'ID',
    fieldName: 'id',
    isRowHeader: true,
    isResizable: true,
    isSorted: false,
    minWidth: 50,
    maxWidth: 50,
    data: 'number',
    isPadded: true,
  },
  {
    key: 'name',
    name: 'Name',
    fieldName: 'name',
    isRowHeader: true,
    isResizable: true,
    isSorted: false,
    data: 'string',
    isPadded: true,
  },
  {
    key: 'email',
    name: 'Email',
    fieldName: 'email',
    isRowHeader: true,
    isResizable: true,
    isSorted: false,
    data: 'string',
    isPadded: true,
  },
  {
    key: 'gender',
    name: 'Gender',
    fieldName: 'gender',
    isRowHeader: true,
    isResizable: true,
    isSorted: false,
    data: 'string',
    isPadded: true,
  },
  {
    key: 'mobile',
    name: 'Mobile',
    fieldName: 'mobile',
    isRowHeader: true,
    isResizable: true,
    isSorted: false,
    data: 'string',
    isPadded: true,
  },
  {
    key: 'date_of_birth',
    name: 'Date Of Birth',
    fieldName: 'date_of_birth',
    isRowHeader: true,
    isResizable: true,
    isSorted: false,
    data: 'string',
    isPadded: true,
   
  },
  {
    key: 'created_at',
    name: 'Created',
    fieldName: 'created_at',
    isRowHeader: true,
    isResizable: true,
    isSorted: false,
    data: 'string',
    isPadded: true,
    onRender: (item) => {
      return moment(item?.created_at).format('LL');
    },
  },
];

function Customer({ history, location }) {
  return (
    <Stack className="inner-page-panel">
      <Breadcrumb items={breadcrumbItems} />
      <Stack
        horizontal
        verticalAlign="center"
        tokens={{ padding: '5px 10px 5px 0' }}
        horizontalAlign="space-between">
        <CommandButton
          text="Create"
          iconProps={{ iconName: 'Add' }}
          onClick={() => history.push(routes.USER_CREATE)}
        />
        <SearchBox
          styles={{
            root: { width: 400, float: 'right', paddingRight: '5px' },
          }}
          placeholder="Search"
          onEscape={() => history.push(searchRoute(location, { query: '' }))}
          onClear={() => history.push(searchRoute(location, { query: '' }))}
          onSearch={(query) => history.push(searchRoute(location, { query }))}
        />
      </Stack>
      <Stack
        horizontal
        verticalAlign="center"
        tokens={{ padding: '5px 10px 5px 0' }}
        horizontalAlign="space-between"></Stack>
      <ResourceTable
        url="users"
        columns={columns}
        editRoute={(item) => routes.USER_EDIT.replace(':id', item.id)}
        viewRoute={(item) => routes.USER_SHOW.replace(':id', item.id)}
        deleteUrl={(item) => `users/${item.id}`}
      />
    </Stack>
  );
}

export default Customer;
