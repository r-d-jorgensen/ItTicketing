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

import styles from './TicketDetailView.css';

export default function TicketDetailView({ ticketInstances, socket }) {
  const { ticketId } = useParams();
  const { token, user } = useAuth();
  const [messages, setMessages] = useState([]);
  const inputEl = useRef(null);

  useEffect(() => {
    socket.on('new_message_success', (message) => {
      setMessages((all) => [...all, message]);
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
        setMessages(resp.sort((a, b) => {
          const aa = (new Date(a.created)).valueOf();
          const bb = (new Date(b.created)).valueOf();
          return (aa > bb) - (aa < bb);
        }));
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

  /* eslint-disable jsx-a11y/no-autofocus */
  return (
    <div className={styles.view}>
      <div className={styles.content}>
        <div className={styles['ticket-details']}>
          <h2 className={styles['ticket-title']}>
            <span>{ticket.title}</span>
            <span className={styles['ticket-id']}>{`#${ticket.id}`}</span>
          </h2>
          <p className={styles['ticket-description']}>{ticket.body}</p>
        </div>
        <div className={styles['message-area']}>
          <MessageView messages={messages} />
          <div className={styles['message-controls']}>
            <textarea
              autoFocus
              placeholder="Enter Message"
              name="Message"
              className={styles['message-input']}
              ref={inputEl}
            />
            <button
              className={styles['message-send-btn']}
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
    owner: PropTypes.exact({
      id: PropTypes.number.isRequired,
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
    }).isRequired,
    ticket_severity: PropTypes.number.isRequired,
    assigned: PropTypes.arrayOf(PropTypes.exact({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      phone_number: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
    })),
  })).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  socket: PropTypes.object.isRequired,
  removeId: PropTypes.func.isRequired,
};
