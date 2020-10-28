import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';

import 'normalize.css';

const TicketHome = loadable(() => import('views/TicketHome'));
const TicketLogin = loadable(() => import('views/TicketLogin'));

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/login" component={TicketLogin} />
        <Route path="/" component={TicketHome} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
