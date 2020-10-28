import React from 'react';
import loadable from '@loadable/component';

const DEVELOPMENT = process.env.NODE_ENV === 'development';
const TicketNav = loadable(() => import('components/TicketNav'));

function TicketLogin() {
  return (
    <div>
      { DEVELOPMENT && <TicketNav /> }
      <main>
        TicketLogin
      </main>
    </div>
  );
}

export { TicketLogin as default };
