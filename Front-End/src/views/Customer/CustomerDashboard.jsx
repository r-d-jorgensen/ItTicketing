import React, { Fragment, useEffect, useState } from 'react';

import Navbar from 'components/Navbar';

import { useAuth } from '../../services/auth';

import './CustomerDashboard.css';

import my_tkts from './mock';

function getTickets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(my_tkts);
    }, 188);
  });
}

function LoadingView() {
  return (
    <div className="it-loading-view">
      <span className="it-lv-message">
        Loading...
      </span>
    </div>
  );
}

function TicketDetailView({ id: ticketId }) {
  return (
    <div className="it-ticket-detail-view">
      {ticketId}
    </div>
  );
}

function CustomerDashboardView({ user, tickets }) {
  const [selectedId, setSelectedId] = useState(null);

  const aa = Array.from(tickets).map((ticket) => (
    <li
      className={"it-cdv-tk-item".concat(selectedId === ticket.id ? ' it-cdv-tk-item--selected' : '')}
      key={ticket.id}
      onClick={(e) => {
        if (selectedId === ticket.id) {
          setSelectedId(null);
        } else {
          setSelectedId(ticket.id)
        }
      }}
    >
      <span>{ticket.title}</span>
    </li>
  ));

  return (
    <Fragment>
      <div className="it-cdv-tk-list-container">
        <ul className="it-cdv-tk-list">
          {aa}
        </ul>
      </div>
      <div className="it-cdv-tk-view">
        {
          selectedId
            ? <TicketDetailView id={selectedId} />
            : <div className="it-cdv-tk-view-empty" />
        }
      </div>
    </Fragment>
  );
}

function CustomerDashboard({ user }) {
  const [isLoading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const gt = async () => {
      setLoading(true);
      const resp = await getTickets();
      setTickets(resp.tickets);
      setLoading(false);
    };

    gt();
  }, [user]);

  if (isLoading) {
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
