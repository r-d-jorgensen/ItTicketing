import React from 'react';
import loadable from '@loadable/component';

const TicketNav = loadable(() => import('components/TicketNav'));

function CustomerDashboard() {
  return (
    <div>
      <TicketNav />
      <main>
        CustomerDashboard
      </main>
    </div>
  );
}

export { CustomerDashboard as default };
