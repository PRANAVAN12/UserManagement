import React from 'react';
import { useSelector } from 'react-redux';
import { Breadcrumb as DefaultBreadcrumb } from '@fluentui/react/lib/Breadcrumb';
import { getUser } from 'selectors/auth';
function Breadcrumb({ items }) {
  const user = useSelector(getUser);
  return (
    <DefaultBreadcrumb
      styles={{
        root: {
          flex: 1,
          backgroundColor: '#fff',
          width: '100%',
          position: 'relative',
        },
      }}
      items={[
        {
          text: user?.name,
          key: 'user',
        },
        ...items,
      ]}
      ariaLabel="Breadcrumb with custom divider icon"
      overflowAriaLabel="More links"
    />
  );
}

export default Breadcrumb;
