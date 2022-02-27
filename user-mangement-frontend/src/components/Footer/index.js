import React from 'react';
import moment from 'moment';
import { Stack } from '@fluentui/react/lib/Stack';
import { name, detail } from 'config/env';
import styles from './Footer.module.css';

function Footer() {
  return (
    <Stack className={styles.footer}>
      <Stack horizontal horizontalAlign="space-between">
        <div>
          Copyright © {moment().year()} {detail}, All rights reserved.
        </div>
        <div>
          <span>Powered by </span>
          {name}
        </div>
      </Stack>
    </Stack>
  );
}

export default Footer;
