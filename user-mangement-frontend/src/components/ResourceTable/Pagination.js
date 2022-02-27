import React from 'react';
import { Text } from '@fluentui/react/lib/Text';
import { Stack } from '@fluentui/react/lib/Stack';
import FabricPagination from 'office-ui-fabric-react-pagination';

function Pagination({ currentPage, lastPage, total, perPage, onChange }) {
  return (
    <Stack
      horizontal
      verticalAlign="center"
      horizontalAlign="space-between"
      styles={{
        root: {
          color: 'white',
          backgroundColor: 'white',
        },
      }}>
      <FabricPagination
        onChange={onChange}
        totalPages={lastPage}
        currentPage={currentPage}
      />
      <Stack
        horizontal
        tokens={{ childrenGap: 10 }}
        styles={{ root: { paddingRight: 15 } }}>
        <Text>Total: {total}</Text>
        <Text>Items: {perPage}</Text>
      </Stack>
    </Stack>
  );
}

export default Pagination;
