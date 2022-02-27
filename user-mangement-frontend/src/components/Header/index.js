import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import Left from './Left';
import Center from './Center';
import Right from './Right';
import styles from './Header.module.css';

function Header({ history }) {
  return (
    <Stack horizontal className={styles.header}>
      <Left />
      <Center />
      <Right history={history} />
    </Stack>
  );
}

export default Header;
