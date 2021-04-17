import React, {
  useRef,
  useState,
  useEffect,
} from 'react';
import { useParams } from 'react-router-dom';

import HistoryView from '../../components/HistoryView';

import { useAuth } from '../../services/auth';
import request from '../../services/api';

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
      <div className="it-tdv-extra">
        <div className="it-tdv-detail-item">
          <span className="it-tdv-detail-title">{ticket.title}</span>
        </div>
        <div className="it-tdv-detail-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span
            className="it-tdv-detail-text"
            title={ticket.created}
          >
            {ticket.created}
          </span>
        </div>
        <div className="it-tdv-contact">
          <span>Contact</span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
          </svg>
          <span className="it-tdv-name">John Doe</span>
          <span className="it-tdv-email">j.doe@domain</span>
        </div>
      </div>
      <div className="it-tdv-content">
        <HistoryView messages={messages} />
        <input
          name="Message"
          placeholder="Send Message"
          ref={inputEl}
          type="text"
        />
        {/* <Input
          name="Message"
          placeholder="Send Message"
          ref={inputEl}
          type="text"
        /> */}
        <button type="button" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
