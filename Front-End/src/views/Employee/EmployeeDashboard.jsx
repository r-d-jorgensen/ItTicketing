import React, { Fragment } from 'react';
import Navbar from 'components/Navbar';
import './EmployeeDashboard.css';

const activeTickets = [
  {ticketOwner: 'Homer Stevenson', company: 'Dix-It', title: 'Email not sending attachments',  priority: 'Urgent',
    details: 'The email is currently not sending attachments that are meant to go with it.'},
  {ticketOwner: 'John Jacobson', company: 'Big Stuff',  title: 'Stuff',  priority: 'Low',
    details: 'words about the problem. words about the problem words about the problem words about the problem'},
  {ticketOwner: 'Bob Levy', company: 'Fix-It', title: 'Unable to add ',  priority: 'mid',
    details: 'words about the problem. words about the problem words about the problem words about the problem'},
];

const filters = [
  'Priority',
  'Company',
  'Alphabetical',
];

function EmployeeDashboard() {
  return (
    <Fragment>
      <Navbar />
      <main id="employee-dashboard">
        <input type="text" placeholder="Look Up Ticket"/>
        <div id="dashboard-filters">
          <h2>Filters</h2>
          {filters.map((type) =>
          <div className="filter">
            <label htmlFor={type}>{type}</label>
            <input type="radio" id={type} value={type} />
          </div> )}
        </div>
        <div>
          <h2>Active Tickets</h2>
          {activeTickets.map(({title, ticketOwner, company, priority, details}) => 
          <div className="activeTicket">
            <h4>{title}</h4>
            <p>{priority}</p>
            <p>{company}: {ticketOwner}</p>
            <p>{details}</p>
          </div>)}
        </div>
      </main> 
    </Fragment>
  );
}

export default EmployeeDashboard;