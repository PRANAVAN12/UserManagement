import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';

const Loader = (
  <Stack
    verticalAlign="center"
    horizontalAlign="center"
    styles={{ root: { flex: 1, marginTop: 50 } }}>
    <Spinner label="Loading..." size={SpinnerSize.large} />
  </Stack>
);

export default Loader;
