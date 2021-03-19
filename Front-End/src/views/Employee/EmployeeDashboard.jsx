import React, { useState, Fragment } from 'react';
import Navbar from 'components/Navbar';
import Button from '../../components/Button';
import './EmployeeDashboard.css';

const activeTickets = [
  {id: '12345', ticketOwner: 'Homer Stevenson', company: 'Dix-It', title: 'Email not sending attachments',  priority: 'Urgent',
    details: [{tech: 'Steve', words: 'The email is currently not sending attachments that are meant to go with it.'}]},
  {id: '4651', ticketOwner: 'John Jacobson', company: 'Big Stuff',  title: 'Stuff',  priority: 'Low',
    details: ['words about the problem. words about the problem words about the problem words about the problem']},
  {id: '4843216', ticketOwner: 'Bob Levy', company: 'Fix-It', title: 'Unable to add ',  priority: 'mid',
    details: ['words about the problem. words about the problem words about the problem words about the problem']},
];

const filters = [
  'Priority',
  'Company',
  'Alphabetical',
  'Date',
  'Status',
];

function EmployeeDashboard() {
  const [activeFilter, setFilter] = useState(filters[0]);
  const handleRequest = () => {
    console.log('Requesting more info from ticket holder');
  };
  
  const handleUpdate = () => {
    console.log('Updateing Ticket');
  };
  
  const handleClose = () => {
    console.log('Closing Ticket');
  };
  
  const handleFilterEvent = ({target}) => {
    setFilter(target.value);
  };
  //may need to create extra rows as it breaks when too many filters exist
  const filterGrid = {gridTemplateColumns: 'auto'};
  filters.forEach(() => {
    filterGrid.gridTemplateColumns += ' auto';
  });
  return (
    <Fragment>
      <Navbar />
      <main id="employee-dashboard">
        <div className="filter-container">
          <h2>Filters</h2>
          <div className="filter-elements" style={filterGrid}>
            {filters.map((type) =>
            <div key={type} className="filter">
              <label htmlFor={type}>{type}&nbsp;</label>
              <input type="radio" name="filter" id={type} value={type} onClick={handleFilterEvent}/>
            </div>)}
          </div>
        </div>
        <div className="tickets-container">
          <h2>Active Tickets</h2>
          <input type="text" placeholder="Look Up Ticket"/>
          {activeTickets.map(({id, title, ticketOwner, company, priority, details}) => 
          <div key={id} className="active-ticket">
            <h4>{title}</h4>
            <div className="ticket-body">
              <p><b>Priority: </b>{priority}&emsp;&emsp;&emsp; {company}: {ticketOwner}</p>
              <p>&emsp;&emsp;{details}</p>
              </div>
            <div className="ticket-actions">
              <Button onClick={handleRequest}>Request</Button>
              <Button onClick={handleUpdate}>Update</Button>
              <Button onClick={handleClose}>Close</Button>
            </div>
          </div>)}
        </div>
      </main> 
    </Fragment>
  );
}

export default EmployeeDashboard;