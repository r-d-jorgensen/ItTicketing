import React from 'react';
import loadable from '@loadable/component';

import TicketChat from 'components/TicketChat';

const TicketNav = loadable(() => import('components/TicketNav'));



function TicketHome() {
  return (
    <div>
      <TicketNav />
      <main>
        TicketHome
        <TicketChat />
      </main>
    </div>
  );
}

export { TicketHome as default };
