import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import Breadcrumb from 'components/Breadcrumb';

function Home({ history }) {
  const breadcrumbItems = [
    {
      text: 'Home',
      key: 'index',
      isCurrentItem: true,
    },
  ];

  return (
    <Stack className="inner-page-panel">
      <Stack>
        <Breadcrumb items={breadcrumbItems} />
      </Stack>
      <Stack className="show-panel"></Stack>
    </Stack>
  );
}

export default Home;
