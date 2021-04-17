import React from 'react';

import './HistoryView.css';

export default function HistoryView({ messages }) {
  return (
    <div className="it-history-view">
      {messages.map((msg) => {
        const { author } = msg;
        const fullName = `${author.first_name} ${author.last_name}`;
        return (
          <div
            className="it-hv-cell"
            key={msg.id}
          >
            <div className="hv-cell-header">
              <span className="hv-cell-name">{fullName}</span>
              <span className="hv-cell-date">{msg.created}</span>
            </div>
            <div className="hv-cell-body">{msg.message}</div>
          </div>
        );
      })}
    </div>
  );
}
