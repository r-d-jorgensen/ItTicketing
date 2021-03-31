import React, { useState, Fragment } from 'react';
import Navbar from 'components/Navbar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { ticketsCall } from './ticketCalls';
import './EmployeeDashboard.css';

const ticketsPerPage = 4;
const filters = [
  'Priority',
  'Company',
  'Title',
  'Date',
  'Status',
];

function EmployeeDashboard() {
  const [activeFilter, setFilter] = useState(filters[0]);
  const [activePage, setPage] = useState(1);
  const tickets = ticketsCall();
  const numPages = Math.ceil(tickets.length / ticketsPerPage);

  const FilterView = () => {
    const filterGrid = {gridTemplateColumns: 'auto'};
    filters.forEach(() => {
      filterGrid.gridTemplateColumns += ' auto';
    });
  
    const handleFilterEvent = ({target}) => { setFilter(target.value); };

    return (
      <div className="filter-container">
        <h2>Filters</h2>
        <div className="filter-elements" style={filterGrid}>
          {filters.map((type) => 
            <div key={type} className="filter">
              <label htmlFor={type}>{type}&nbsp;</label>
              <input type="radio" name="filter" id={type} value={type} onClick={handleFilterEvent}/>
            </div>,
          )}
        </div>
      </div>
    );
  };

  const TicketView = () => {
    const displyedTickets = tickets.slice((activePage-1)*ticketsPerPage, activePage*ticketsPerPage);
    const handleDetails = () => {
      //console.log('Open details');
    };
  
    return (
      <div className="tickets-container">
        <h2>Tickets</h2>
        {displyedTickets.map(({
          id,
          title,
          ticketOwner,
          company,
          priority,
          details: {userID, userTitle, user, content}}) => 
          <div key={id} className="active-ticket">
            <h4>{title}</h4>
            <div className="ticket-body">
              <p>Ticket ID - {id}</p>
              <p><b>Priority - </b>{priority}&emsp;&emsp;&emsp;{company} - {ticketOwner}</p>
              <p>{userTitle}: {userID} - {user}</p>
              <p>&emsp;{content}</p>
            </div>
            <Button onClick={handleDetails}>Details</Button>
          </div>,
        )}
      </div>
    );
  };

  const PageButtons = () => {
    const [userPage, setUserPage] = useState('');
    const [userPageError, setUserPageError] = useState(null);
    const handleUserPage = ({target}) => { setUserPage(target.value); };

    const handlePageEvent = ({target}) => {
      if (target.value <= numPages && target.value > 0) {
        setPage(target.value);
      } else {
        setUserPageError('Invalid Input');
      }
    };
    
    return (
      <div>
        {Array.from({length: numPages}, (_, i) => i + 1).map((pageNumber) => 
          <Button key={pageNumber} value={pageNumber} onClick={handlePageEvent} >
            {(pageNumber).toString()}
          </Button>,
        )}
        <div> 
          <Input
            name="userPage"
            placeholder="Go To"
            value={userPage}
            type="number"
            onChange={handleUserPage}
            error={userPageError}/>
          <Button
            name="customPageRequest"
            value={userPage}
            onClick={handlePageEvent}
            >GO
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <Navbar />
      <main className="employee-dashboard">
        <FilterView />
        <TicketView />
        <PageButtons />
      </main> 
    </Fragment>
  );
}

export default EmployeeDashboard;