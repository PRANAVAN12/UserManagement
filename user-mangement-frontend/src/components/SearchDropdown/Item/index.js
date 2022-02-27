import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

function Item({ item, getText }) {
  const text = getText(item);

  return (
    <div className={styles.itemLink}>
      <div className={styles.itemContent}>
        <div className={styles.itemName}>{text}</div>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.any,
  onClick: PropTypes.func,
};

export default Item;
