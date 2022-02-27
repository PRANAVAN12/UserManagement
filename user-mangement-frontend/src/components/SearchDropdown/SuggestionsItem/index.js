import React from 'react';
import PropTypes from 'prop-types';
import { Persona } from '@fluentui/react/lib/Persona';
import styles from './styles';

function SuggestionsItem({ item, getText, getImage }) {
  const text = getText(item);
  const image = getImage ? getImage(item) : null;

  return (
    <div className={styles.itemCell}>
      <div className={styles.itemLink}>
        <div className={styles.itemContent}>
          <Persona
            size={7}
            text={text}
            imageUrl={image}
            imageInitials={text.charAt(0).toUpperCase()}
          />
        </div>
      </div>
    </div>
  );
}

SuggestionsItem.propTypes = {
  item: PropTypes.any,
  onClick: PropTypes.func,
};

export default SuggestionsItem;
