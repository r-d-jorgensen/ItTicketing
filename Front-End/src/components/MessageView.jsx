import React from 'react';
import PropTypes from 'prop-types';

import './MessageView.css';

export default function MessageView({ messages }) {
  return (
    <div className="it-message-view-wrapper">
      <div className="it-message-view-content">
        {messages.map((msg) => {
          const { author } = msg;
          const fullName = `${author.first_name} ${author.last_name}`;
          const dispDate = new Date(msg.created);
          return (
            <div
              className="it-msg-cell"
              key={msg.id}
            >
              <div className="msg-cell-header">
                <span className="msg-cell-name">{fullName}</span>
                <span className="msg-cell-date">{dispDate.toLocaleString()}</span>
              </div>
              <div className="msg-cell-body">{msg.message}</div>
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
