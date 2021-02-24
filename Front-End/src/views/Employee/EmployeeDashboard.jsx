import React from 'react';
import Navbar from 'components/Navbar';

function EmployeeDashboard() {
  return (
    <fragment>
      <Navbar />
      <main id="employee-dashboard">
        <div id="dashboard-filters">
          {/*list of filters to change active tickets displyed*/}
        </div>
        <div>
          <h3>Active Tickets</h3>
          {/*map function to render active tickets */}
        </div>
      </main> 
    </fragment>
  );
}

export default EmployeeDashboard;