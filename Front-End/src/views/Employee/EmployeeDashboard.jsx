import React, { useState, Fragment } from 'react';
import Navbar from 'components/Navbar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { ticketsShallowCall } from './ticketCalls';
import './EmployeeDashboard.css';

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
  const tickets = ticketsShallowCall(activeFilter, activePage);

  const FilterView = () => {
    const filterGrid = {gridTemplateColumns: 'auto'};
    filters.forEach(() => {
      filterGrid.gridTemplateColumns += ' auto';
    });
  
    const handleFilterEvent = ({target}) => {
      setFilter(target.value);
    };
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
    const handleDetails = () => {
      //console.log('Open details');
    };
  
    return (
      <div className="tickets-container">
        <h2>Tickets</h2>
        {tickets.map(({
          id,
          title,
          ticketOwner,
          company,
          priority,
          details: {userTitle, user, content}}) => 
          <div key={id} className="active-ticket">
            <h4>{title}</h4>
            <div className="ticket-body">
              <p><b>Priority: </b>{priority}&emsp;&emsp;&emsp;{company}: {ticketOwner}</p>
              <p>{userTitle}: {user}</p>
              <p>{content}</p>
            </div>
            <Button onClick={handleDetails}>Details</Button>
          </div>,
        )}
      </div>
    );
  };

  const PageButtons = () => {
    const pageSize = 1;
    const [userPage, setUserPage] = useState('');
    const [userPageError, setUserPageError] = useState(null);
    const numPages = Math.ceil(tickets.length / pageSize);
    const handleUserPage = ({target}) => {
      setUserPage(target.value);
    };

    const handlePageEvent = ({target}) => {
      if (target.value <= numPages && target.value > 0) {
        setPage(target.value);
      } else { setUserPageError('Invalid Input'); }
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