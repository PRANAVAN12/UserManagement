import React from 'react';
import { Modal } from '@fluentui/react/lib/Modal';
import { Stack } from '@fluentui/react/lib/Stack';
import { Icon } from '@fluentui/react/lib/Icon';
import { getTheme } from '@fluentui/react/lib/Styling';
import styles from './RichModal.module.css';

function RichModal({ icon, isOpen, title, description, children }) {
  const theme = getTheme();

  return (
    <Modal isOpen={isOpen}>
      <Stack className={styles.editor}>
        <Stack className={styles.header}>
          <Stack className={styles.title}>{title}</Stack>
          <Stack className={styles.description}>{description}</Stack>
          <Stack
            verticalAlign="center"
            horizontalAlign="center"
            styles={{ root: { flex: 1 } }}
            className={styles['image-container']}>
            <Icon
              iconName={icon}
              styles={{
                root: {
                  fontSize: 100,
                  color: theme.semanticColors.variantBorderHovered,
                },
              }}
            />
          </Stack>
        </Stack>
        <Stack className={styles.body}>{children}</Stack>
      </Stack>
    </Modal>
  );
}

export default RichModal;
