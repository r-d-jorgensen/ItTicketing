import React from 'react';
import PropTypes from 'prop-types';

import styles from './MessageView.css';

export default function MessageView({ messages }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {messages.map((msg) => {
          const { author } = msg;
          const fullName = `${author.first_name} ${author.last_name}`;
          const dispDate = new Date(msg.created);
          return (
            <div
              className={styles.cell}
              key={msg.id}
            >
              <div className={styles['cell-header']}>
                <span className={styles['cell-name']}>{fullName}</span>
                <span className={styles['cell-date']}>{dispDate.toLocaleString()}</span>
              </div>
              <div className={styles['cell-body']}>{msg.message}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

MessageView.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.any).isRequired,
};
