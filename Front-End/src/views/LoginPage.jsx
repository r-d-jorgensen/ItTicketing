import React from 'react';
import loadable from '@loadable/component';

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const TicketNav = loadable(() => import('components/TicketNav'));

function TicketLogin() {
  return (
    <div>
      { DEVELOPMENT && <TicketNav /> }
      <main>
        <p>Log In</p>
        <form>
          <input placeholder="email" />
          <input placeholder="password" />
          <button type="submit">Log In</button>
        </form>
      </main>
    </div>
  );
}

export { TicketLogin as default };
