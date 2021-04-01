import React, { useState, Fragment } from 'react';
import Navbar from 'components/Navbar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { ticketsCall, ticketDetails } from './ticketCalls';
import './EmployeeDashboard.css';

const ticketsPerPage = 4;
const filters = [
  {name: 'priority', values: ['All', 'Low', 'Mid', 'High', 'Urgent']},
  //{name: 'title', values: ['A -> Z', 'Z -> A']},
];

function EmployeeDashboard() {
  const [activeFilter, setFilter] = useState('All');
  const [activePage, setPage] = useState(1);
  const tickets = ticketsCall().filter((ticket) => {
    if (activeFilter === 'All') {
      return ticket;
    }
    return ticket.priority === activeFilter;
  });

  const PageButtons = () => {
    const [userPage, setUserPage] = useState('');
    const [userPageError, setUserPageError] = useState(null);
    const handleUserPage = ({target}) => { setUserPage(target.value); };
    const numPages = Math.ceil(tickets.length / ticketsPerPage);

    const handlePageEvent = ({target}) => {
      if (target.value <= numPages && target.value > 0) {
        setPage(target.value);
      } else {
        setUserPageError('Invalid Input');
      }
    };
    
    return (
      <div className="page-button-container" >
        <h2 className="control-header" >Pages</h2>
        <div className="page-button-display" >
          {Array.from({length: numPages}, (_, i) => i + 1).map((pageNumber) => 
            <button
              key={pageNumber}
              type="button"
              className="page-button"
              value={pageNumber}
              onClick={handlePageEvent} >
              {(pageNumber).toString()}
            </button>,
          )}
          <Input
            name="userPage"
            className="user-page-input"
            value={userPage}
            type="number"
            onChange={handleUserPage} />
          <button
            type="button"
            name="customPageRequest"
            className="page-button"
            value={userPage}
            onClick={handlePageEvent}
            >GO
          </button>
          {userPageError ? <p className="page-error" >{userPageError}</p> : ''}
        </div>
      </div>
    );
  };

  const FilterView = () => {
    const handleFilterChange = ({target}) => { setFilter(target.value); };
    return (
      <div className="controls-container">
        <PageButtons />
        <h2>Filters</h2>
        <div>
          {filters.map(({name, values}) =>
          <div key={name} >
            {name}
            {values.map((value) =>
            <div key={value} >
              <label htmlFor={value}>{value}&nbsp;</label>
              <input type="radio" name={name} value={value} onClick={handleFilterChange}/>
            </div>,
            )}
          </div>,
          )}
        </div>
      </div>
    );
  };

  const TicketView = () => {
    const [ticketChange, setTicketChange] = useState('');
    const [activeDetails, setActiveDetails] = useState(null);
    const displyedTickets = tickets.slice((activePage-1)*ticketsPerPage, activePage*ticketsPerPage);
    const handleDetails = ({target}) => {
      if (activeDetails === target.id ) {
        setActiveDetails(null);
        setTicketChange('');
      } else {
        setActiveDetails(target.id);
      }
    };
    
    const handleTicketChange = ({target}) => {
      setTicketChange(target.value);
    };

    const handleRequest = () => {

      setActiveDetails(null);
    };

    const handleUpdate = () => {

      setActiveDetails(null);
    };

    const handleClose = () => {

      setActiveDetails(null);
    };
  
    return (
      <div className="tickets-container">
        <h2 className="control-header" >Tickets</h2>
        {displyedTickets.map(({
          id,
          title,
          ticketOwner,
          company,
          priority,
          details: {userIdInitial, userTitleInitial, userInitial, contentInitial}}) => 
          <div key={id} className="active-ticket">
            <h4>{title}</h4>
            <div className="ticket-body">
              <p>Ticket ID - {id}</p>
              <p><b>Priority - </b>{priority}&emsp;&emsp;&emsp;{company} - {ticketOwner}</p>
              <p>{userTitleInitial}: {userIdInitial} - {userInitial}</p>
              <p>&emsp;{contentInitial}</p>
              <Button id={id} onClick={handleDetails}>Details</Button>
              {activeDetails != id ? '' : <div>
                {ticketDetails(id).map(({userID, userTitle, user, content}) => 
                  <div key={id+content} >
                    <p>{userTitle}: {userID} - {user}</p>
                    <p>&emsp;{content}</p>
                  </div>,
                )}
                <Input
                  name="ticketChange"
                  value={ticketChange}
                  onChange={handleTicketChange}
                />
                <button id={id} className="ticket-change-button" type="button" onClick={handleRequest}>Request</button>
                <button id={id} className="ticket-change-button" type="button" onClick={handleUpdate}>Update</button>
                <button id={id} className="ticket-change-button" type="button" onClick={handleClose}>Close</button>
              </div>}
            </div>
          </div>,
        )}
      </div>
    );
  };

  return (
    <Fragment>
      <Navbar />
      <main className="employee-dashboard">
        <FilterView />
        <TicketView />
      </main> 
    </Fragment>
  );
}

export default EmployeeDashboard;