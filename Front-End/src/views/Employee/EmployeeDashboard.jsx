import React, { useState, Fragment } from 'react';
import Navbar from 'components/Navbar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { ticketsCall, ticketDetails } from './ticketCalls';
import './EmployeeDashboard.css';

function EmployeeDashboard() {
  const ticketsPerPage = 4;
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
          {userPageError ? <p className="page-error" ><b>{userPageError}</b></p> : ''}
        </div>
      </div>
    );
  };

  const FilterView = () => {
    const handleFilterChange = ({target}) => { setFilter(target.value); };
    const filters = [
      {name: 'Title', className: 'title-filter', values: ['A -> Z', 'Z -> A']},
      {name: 'Priority', className: 'priority-filter', values: ['All', 'Low', 'Mid', 'High', 'Urgent']},
    ];
    
    return (
      <Fragment>
        <h2 className="control-header" >Filters</h2>
        <div className="filters-display">
          {filters.map(({name, values, className}) =>
          <div key={name} className={className} >
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
      </Fragment>
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
        <h1 id="main-title">Tickets</h1>
        {displyedTickets.map(({
          id,
          title,
          ticketOwner,
          company,
          priority,
          details: {userIdInitial, userTitleInitial, userInitial, contentInitial}}) => 
          <div key={id} className="active-ticket">
            <h3 className="main-details" id="ticket-title" >{title}</h3>
            <div className="ticket-body">
              <h4 className="main-details" >Ticket ID - {id}</h4>
              <p className="main-details" ><b>Priority - </b>{priority}</p>
              <p className="main-details" ><b>{company}</b> - {ticketOwner}</p>
              {activeDetails != id ?
                <div>
                <div className="ticket-detail">
                  <h5>{userTitleInitial}: {userIdInitial} - {userInitial}</h5>
                  <p>&emsp;{contentInitial}</p>
                </div>
                <Button id={id} onClick={handleDetails}>Expand Details</Button>
              </div> : <div >
                {ticketDetails(id).map(({userID, userTitle, user, content}) => 
                  <div key={id+content} className="ticket-detail" >
                    <h5>{userTitle}: {userID} - {user}</h5>
                    <p>&emsp;{content}</p>
                  </div>,
                )}
                <Button id={id} onClick={handleDetails}>Collapse Details</Button>
                <Input
                  name="ticketChange"
                  id="ticket-input"
                  value={ticketChange}
                  onChange={handleTicketChange}
                />
                <div className="button-container" >
                  <button id={id} className="ticket-change-button" type="button" onClick={handleRequest}>Request</button>
                  <button id={id} className="ticket-change-button" type="button" onClick={handleUpdate}>Update</button>
                  <button id={id} className="ticket-change-button" type="button" onClick={handleClose}>Close</button>
                </div>
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
        <div className="controls-container">
          <PageButtons />
          <FilterView />
        </div>
        <TicketView />
      </main> 
    </Fragment>
  );
}

export default EmployeeDashboard;