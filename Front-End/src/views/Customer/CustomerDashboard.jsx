import React, { Fragment, useEffect, useState } from 'react';

import Navbar from 'components/Navbar';
import HistoryView from 'components/HistoryView';
import Input from 'components/Input';

import { useAuth } from '../../services/auth';
import request from '../../services/api';

import './CustomerDashboard.css';

function LoadingView() {
  return (
    <div className="it-loading-view">
      <span className="it-lv-message">
        Loading...
      </span>
    </div>
  );
}

function TicketDetailView({ ticket }) {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);

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

  return (
    <div className="it-ticket-detail-view">
      <div className="it-tdv-extra">
        <div className="it-tdv-detail-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
          <span>{ticket.id}</span>
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
        <Input
          name="Message"
          placeholder="Send Message"
        />
      </div>
    </div>
  );
}

function CustomerDashboardView({ user, tickets }) {
  const ticketsArr = Array.from(tickets);
  const mostRecent = ticketsArr.length > 0 ? ticketsArr[0] : null;
  const [selectedTicket, setSelectedTicket] = useState((
    mostRecent === null
      ? { id: '', instance: null }
      : { id: mostRecent.id, instance: mostRecent }
  ));

  const aa = ticketsArr.map((ticket) => (
    <li
      className="it-cdv-tk-item"
      key={ticket.id}
    >
      <button
        className={'it-cdv-tk-btn'.concat(selectedTicket.id === ticket.id ? ' it-cdv-tk-btn--selected' : '')}
        type="button"
        onClick={() => {
          if (selectedTicket.id !== ticket.id) {
            setSelectedTicket({ id: ticket.id, instance: ticket });
          }
        }}
      >
        {ticket.title}
      </button>
    </li>
  ));

  return (
    <Fragment>
      <div className="it-cdv-tk-list-container">
        <ul className="it-cdv-tk-list">
          {aa}
        </ul>
      </div>
      {
        selectedTicket.id && selectedTicket.instance !== null
          ? <TicketDetailView ticket={selectedTicket.instance} />
          : <div className="it-cdv-tk-view-empty" />
      }
    </Fragment>
  );
}

function CustomerDashboard({ user }) {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [isTicketsLoading, setTicketsLoading] = useState(!(tickets && tickets.length > 0));

  useEffect(() => {
    const gt = async () => {
      setTicketsLoading(true);
      // TODO: filter properties on tickets
      const resp = await request('/api/tickets', {
        method: 'GET',
        headers: new Headers({ Authorization: `Bearer ${token}` }),
      });
      if (process.env.NODE_ENV === 'development') {
        console.groupCollapsed('[api] /api/tickets');
        console.log(resp);
        console.groupEnd('[api] /api/tickets');
      }
      setTickets(resp);
      setTicketsLoading(false);
    };

    gt();
  }, [user, token]);

  if (isTicketsLoading) {
    return <LoadingView />;
  }
  return <CustomerDashboardView user={user} tickets={tickets} />;
}

export default () => {
  const { user } = useAuth();

  return (
    <Fragment>
      <Navbar />
      <main className="it-customer-dashboard">
        { user && (
          <CustomerDashboard user={user} />
        )}
      </main>
    </Fragment>
  );
};
