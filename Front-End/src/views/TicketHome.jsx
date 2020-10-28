import React from 'react';
import loadable from '@loadable/component';

const TicketNav = loadable(() => import('components/TicketNav'));

function TicketHome() {
  return (
    <div>
      <TicketNav />
      <main>
        TicketHome
      </main>
    </div>
  );
}

export { TicketHome as default };
