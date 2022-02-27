import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import styles from './Left.module.css';
import { name, detail } from 'config/env';

function Left() {
  return (
    <Stack
      horizontal
      verticalAlign={'center'}
      styles={{ root: { width: '100%' } }}>
      <Stack className="ms-textAlignLeft" style={{ width: '100%' }}>
        <Text className={styles.heading}>{name}</Text>
        <Text className={styles['sub-heading']}>{detail}</Text>
      </Stack>
    </Stack>
  );
}

export default Left;
