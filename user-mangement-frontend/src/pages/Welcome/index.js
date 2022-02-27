import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { name } from 'config/env';
import moment from 'moment';

function Welcome() {
  return (
    <Stack
      horizontalAlign="center"
      verticalAlign="center"
      styles={{ root: { height: '100vh' } }}>
      <Stack tokens={{ childrenGap: 10 }}>
        <Spinner
          size={SpinnerSize.large}
          label="We are getting ready to start."
        />
        <Text styles={{ root: { marginTop: '100px' } }}>
          Copyright © {moment().year()} {name}, All rights reserved.
        </Text>
      </Stack>
    </Stack>
  );
}

export default Welcome;
