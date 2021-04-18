/* eslint-disable no-console */
import React, {
  Fragment,
  useEffect,
  useState,
  useRef,
} from 'react';
import {
  Route,
  Switch,
  Link,
  useRouteMatch,
} from 'react-router-dom';
import { io } from 'socket.io-client';
import PropTypes from 'prop-types';

import Navbar from 'components/Navbar';
import NewFormModal from 'views/Customer/NewFormModal';
import TicketDetailView from 'views/Customer/TicketDetailView';

import { useAuth } from '../../services/auth';
import request from '../../services/api';

import './CustomerDashboard.css';

const isDEV = process.env.NODE_ENV === 'development';

function LoadingView() {
  return (
    <div className="it-loading-view">
      <span className="it-lv-message">
        Loading...
      </span>
    </div>
  );
}

function CustomerDashboardView({
  ticketInstances,
  ticketSplitIds,
}) {
  const [ticketViewType, setTicketViewType] = useState('open');
  const [openTicketIds, closedTicketIds] = ticketSplitIds;

  let currentTickets = openTicketIds;
  if (ticketViewType === 'closed') {
    currentTickets = closedTicketIds;
  }

  const ticketElements = currentTickets.map((id) => {
    const ticket = ticketInstances[id];
    const odate = new Date(ticket.created);
    const displayDate = `Opened: ${odate.toLocaleDateString()}`;
    return (
      <li
        key={ticket.id}
        className="it-cdv-tk-item"
      >
        <div className="cdv-tk-item-prim-line">
          <Link
            className="cdv-tk-item-title"
            to={`/dashboard/ticket/${ticket.id}`}
          >
            {ticket.title}
          </Link>
          <span className="cdv-tk-item-id">{ticket.id}</span>
        </div>
        <div className="cdv-tk-item-sec-line">
          <span className="cdv-tk-item-odate">{displayDate}</span>
        </div>
      </li>
    );
  });

  return (
    <Fragment>
      <div className="it-cdv-wrapper">
        <div className="it-cdv-tk-container">
          <div className="it-cdv-tk-filters">
            <div className="it-cdv-filters-left">
              <button
                onClick={() => { setTicketViewType('open'); }}
                className={'it-cdv-tk-btn'.concat([ticketViewType === 'open' ? ' it-cdv-tk-btn--active' : ''])}
                type="button"
              >
                Open
              </button>
              <button
                onClick={() => { setTicketViewType('closed'); }}
                className={'it-cdv-tk-btn'.concat([ticketViewType === 'closed' ? ' it-cdv-tk-btn--active' : ''])}
                type="button"
              >
                Closed
              </button>
            </div>
            <div className="it-cdv-filters-right" />
          </div>
          <ul className="it-cdv-tk-list">
            {ticketElements}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}

function CustomerDashboard({ setShowModal }) {
  const { path } = useRouteMatch();

  const { token } = useAuth();
  const [tkInstances, setTkInstances] = useState({});
  const [tickets, setTickets] = useState([]);
  const [isTicketsLoading, setTicketsLoading] = useState(Object.keys(tkInstances).length === 0);
  const [error, setError] = useState(null);

  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io(process.env.TICKET_WEBSOCKET_URL, {
      rememberUpgrade: true,
      transports: ['websocket'],
      auth: {
        token: `Bearer ${token}`,
      },
    });
    socket.onAny((ename, ...args) => { console.log(ename, args); });
    if (isDEV) {
      socket.on('connect', () => { console.log('[ws] opened'); });
      socket.on('disconnect', () => { console.log('[ws] closed'); });
    }

    socketRef.current = socket;
    return () => { socketRef.current.close(); };
  }, [token]);

  useEffect(() => {
    const gt = async () => {
      if (isDEV) { console.groupCollapsed('[api] /api/tickets'); }
      setTicketsLoading(true);
      // TODO: filter properties on tickets
      let resp = [];
      try {
        resp = await request('/api/tickets', {
          method: 'GET',
          headers: new Headers({ Authorization: `Bearer ${token}` }),
        });
        resp = Array.from(resp).reduce((acc, tk) => {
          acc[tk.status === 1 ? 0 : 1].push(tk.id);
          setTkInstances((prev) => ({ ...prev, [tk.id]: tk }));
          return acc;
        }, [[], []]);
        if (isDEV) { console.log(resp); }
      } catch (err) {
        if (isDEV) { console.error(err); }
        setError(err);
      }

      if (isDEV) { console.groupEnd('[api] /api/tickets'); }
      if (error === null) {
        setTickets(resp);
      }
      setTicketsLoading(false);
    };

    gt();
  }, [token, error]);

  if (isTicketsLoading) { return <LoadingView />; }

  // TODO: don't pass instances to detail view probably
  return (
    <Fragment>
      <div className="cdv-tk-action-line">
        <button
          type="button"
          className="cdv-tk-new-btn"
          onClick={() => { setShowModal(true); }}
        >
          Open New Ticket
        </button>
        <input
          name="tk-search"
          className="cdv-tk-search"
          placeholder="Search Open Tickets"
          type="text"
        />
      </div>
      <Switch>
        <Route exact path={path}>
          <CustomerDashboardView
            ticketSplitIds={tickets}
            ticketInstances={tkInstances}
          />
        </Route>
        <Route path={`${path}/ticket/:ticketId`}>
          <TicketDetailView
            ticketInstances={tkInstances}
            socket={socketRef.current}
          />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default () => {
  const { user } = useAuth();

  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      <Navbar />
      <main className="it-customer-dashboard">
        { user && (
          <CustomerDashboard setShowModal={setShowModal} />
        )}
        <NewFormModal
          show={showModal}
          setShow={setShowModal}
        />
      </main>
    </Fragment>
  );
};

CustomerDashboard.propTypes = {
  setShowModal: PropTypes.func.isRequired,
};

/* eslint-disable react/no-unused-prop-types */
CustomerDashboardView.propTypes = {
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
  ticketSplitIds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};
