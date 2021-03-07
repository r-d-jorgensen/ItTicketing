import React from 'react';
import loadable from '@loadable/component';

import { useAuth } from '../services/auth';

function Dashboard() {
  const { user } = useAuth();

  if (user && user.user_type === 'employee') {
    const EmployeeDashboard = loadable(() => import('views/Employee/EmployeeDashboard'));
    return <EmployeeDashboard />;
  // eslint-disable-next-line no-else-return
  } else if (user && user.user_type === 'customer') {
    const CustomerDashboard = loadable(() => import('views/Customer/CustomerDashboard'));
    return <CustomerDashboard />;
  }
}

export default Dashboard;
