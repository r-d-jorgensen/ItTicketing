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

import Navbar from 'components/Navbar';
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
  user,
  ticketInstances,
  ticketSplitIds,
  socket,
}) {
  const { url } = useRouteMatch();
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
            to={`${url}/ticket/${ticket.id}`}
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
        <div className="cdv-tk-action-line">
          <button
            type="button"
            className="cdv-tk-new-btn"
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

function CustomerDashboard({ user }) {
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
      isDEV && console.groupCollapsed('[api] /api/tickets');
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
        isDEV && console.log(resp);
      } catch (err) {
        isDEV && console.error(err);
        setError(err);
      }

      isDEV && console.groupEnd('[api] /api/tickets');
      error === null && setTickets(resp);
      setTicketsLoading(false);
    };

    gt();
  }, [user, token, error]);

  if (isTicketsLoading) { return <LoadingView />; }

  // TODO: don't pass instances to detail view probably
  return (
    <Switch>
      <Route exact path={path}>
        <CustomerDashboardView
          user={user}
          ticketSplitIds={tickets}
          ticketInstances={tkInstances}
          socket={socketRef.current}
        />
      </Route>
      <Route path={`${path}/ticket/:ticketId`}>
        <TicketDetailView
          ticketInstances={tkInstances}
          socket={socketRef.current}
        />
      </Route>
    </Switch>
  );
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
