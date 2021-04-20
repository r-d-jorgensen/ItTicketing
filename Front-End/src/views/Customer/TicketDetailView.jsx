/* eslint-disable  no-console */
import React, {
  useRef,
  useState,
  useEffect,
} from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import MessageView from '../../components/MessageView';

import { useAuth } from '../../services/auth';
import request from '../../services/api';

import './TicketDetailView.css';

export default function TicketDetailView({ ticketInstances, socket }) {
  const { ticketId } = useParams();
  const { token, user } = useAuth();
  const [messages, setMessages] = useState([]);
  const inputEl = useRef(null);

  useEffect(() => {
    socket.on('new_message_success', (message) => {
      setMessages((all) => [message, ...all]);
    });
  }, [socket]);

  const ticket = ticketInstances[ticketId];

  useEffect(() => {
    if (ticket) {
      const getTicketMessages = async () => {
        const resp = await request(`/api/ticket/${ticket.id}/messages`, {
          method: 'GET',
          headers: new Headers({ Authorization: `Bearer ${token}` }),
        });
        if (process.env.NODE_ENV === 'development') {
          console.groupCollapsed(`[api] /api/ticket/${ticket.id}/messages`);
          console.log(resp);
          console.groupEnd(`[api] /api/ticket/${ticket.id}/messages`);
        }
        setMessages(resp);
      };

      getTicketMessages();
    }
  }, [ticket, token]);

  const sendMessage = () => {
    if (!socket || !inputEl.current) {
      return;
    }

    if (inputEl.current.value === '') {
      return;
    }

    socket.emit('new_message', {
      message: inputEl.current.value,
      user_id: user.id,
      ticket_id: ticket.id,
    });

    inputEl.current.value = '';
  };

  return (
    <div className="it-ticket-detail-view">
      <div className="it-tdv-content">
        <div className="it-tdv-details">
          <h2 className="it-tdv-title">
            <span>{ticket.title}</span>
            <span className="it-tdv-id">{`#${ticket.id}`}</span>
          </h2>
          <p className="it-tdv-body">{ticket.body}</p>
        </div>
        <div className="it-tdv-hv">
          <MessageView messages={messages} />
          <div className="it-tdv-bottom">
            <textarea
              placeholder="Enter Message"
              name="Message"
              className="it-tdv-message"
              ref={inputEl}
            />
            <button
              className="it-tdv-btn"
              type="button"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable react/no-unused-prop-types */
TicketDetailView.propTypes = {
  ticketInstances: PropTypes.objectOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    created: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    date_closed: PropTypes.string,
    user_id: PropTypes.number.isRequired,
    ticket_severity: PropTypes.number.isRequired,
    assigned: PropTypes.arrayOf(PropTypes.exact({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      phone_number: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })),
  })).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  socket: PropTypes.object.isRequired,
  removeId: PropTypes.func.isRequired,
};
