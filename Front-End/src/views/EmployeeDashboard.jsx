import React from 'react';
import loadable from '@loadable/component';

const TicketNav = loadable(() => import('components/TicketNav'));

function EmployeeDashboard() {
  return (
    <div>
      <TicketNav />
      <main>
        EmployeeDashboard
      </main>
    </div>
  );
}

export { EmployeeDashboard as default };
