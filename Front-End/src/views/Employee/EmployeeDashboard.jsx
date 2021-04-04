import React, { useState, Fragment, useEffect } from 'react';
import Navbar from 'components/Navbar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../services/auth';
import './EmployeeDashboard.css';

import allTickets from './allTickets.js';
import ticketDetails from './ticketDetails.js';

function getTicketsCall() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(allTickets);
    }, 100);
  });
}

function getTicketDetailsCall() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ticketDetails);
    }, 100);
  });
}

function EmployeeDashboard() {
  const ticketsPerPage = 4;
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeFilter, setFilter] = useState('All');
  const [activePage, setPage] = useState(1);
  const [tickets, setTickets] = useState([]);
  const postFilterTickets = tickets.filter((ticket) => {
    if (activeFilter === 'All') {
      return ticket;
    }
    return ticket.priority === activeFilter;
  })


  useEffect(() => {
    const getTickets = async () => {
      setLoading(true);
      const resp = await getTicketsCall();
      setTickets(resp.tickets);
      setLoading(false);
    };
    getTickets();
  }, [user]);

  const PageButtons = () => {
    const [userPage, setUserPage] = useState(1);
    const [userPageError, setUserPageError] = useState(null);
    const handleUserPage = ({target}) => { setUserPage(target.value); };
    const numPages = Math.ceil(postFilterTickets.length / ticketsPerPage);

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
      {name: 'Title', values: ['A -> Z', 'Z -> A']},
      {name: 'Priority', values: ['All', 'Low', 'Mid', 'High', 'Urgent']},
    ];

    return (
      <Fragment>
        <h2 className="control-header" >Filters</h2>
        <div className="filters-display">
          {filters.map(({name, values}) =>
          <div key={name} className="filter-set" >
            <b>{name}</b>
            {values.map((value) =>
            <div key={value} className="filter-values">
              <label className="filter-values" htmlFor={value}>{value}&nbsp;</label>
              <input className="filter-values" type="radio" name={name} value={value} onClick={handleFilterChange}/>
            </div>,
            )}
          </div>,
          )}
        </div>
      </Fragment>
    );
  };

  const TicketView = () => {
    const [activeDetails, setActiveDetails] = useState(null);
    const displyedTickets = postFilterTickets.slice((activePage-1)*ticketsPerPage, activePage*ticketsPerPage);

    const handleDetails = ({target}) => {
      if (activeDetails === target.id ) {
        setActiveDetails(null);
      } else {
        setActiveDetails(target.id);
      }
    };
  
    return (
      <div className="tickets-container">
        <h1 id="main-title">Tickets</h1>
        {displyedTickets.map(({
          ticketID,
          title,
          ticketOwner,
          company,
          priority,
          details: {userID, userTitle, userFullName, detail}}) => 
          <div key={ticketID} className="active-ticket">
            <h3 className="main-details" id="ticket-title" >{title}</h3>
            <div className="ticket-body">
              <h4 className="main-details" >Ticket ID - {ticketID}</h4>
              <p className="main-details" ><b>Priority - </b>{priority}</p>
              <p className="main-details" ><b>{company}</b> - {ticketOwner}</p>
              {activeDetails != ticketID ?
              <div>
                <div className="ticket-detail">
                  <h5>{userTitle}: {userID} - {userFullName}</h5>
                  <p>&emsp;{detail}</p>
                </div>
                <Button id={ticketID} onClick={handleDetails}>Expand Details</Button>
              </div>
              : <TicketDetailsView ticketID={ticketID} setActiveDetails={setActiveDetails} handleDetails={handleDetails} /> }
            </div>
          </div>,
        )}
      </div>
    );
  };

  const TicketDetailsView = ({ticketID, setActiveDetails, handleDetails}) => {
    const [loadingDetails, setLoadingDetails] = useState(true);
    const [ticketDetails, setTicketDetails] = useState([]);
    const [ticketChange, setTicketChange] = useState('');

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

    useEffect(() => {
      const getTickets = async () => {
        setLoadingDetails(true);
        const resp = await getTicketDetailsCall();
        setTicketDetails(resp.ticketDetails);
        setLoadingDetails(false);
      };
  
      getTickets();
    }, [user]);
    
    if (loadingDetails) {
      return <h3>Loading Details</h3>;
    }

    return (
      <div >
        {ticketDetails.map(({detailID, userID, userTitle, userFullName, detail}) => 
          <div key={detailID} className="ticket-detail" >
            <h5>{userTitle}: {userID} - {userFullName}</h5>
            <p>&emsp;{detail}</p>
          </div>,
        )}
        <Button id={ticketID} onClick={handleDetails}>Collapse Details</Button>
        <Input
          name="ticketChange"
          id="ticket-input"
          value={ticketChange}
          onChange={handleTicketChange}
        />
        <div className="button-container" >
          <button id={ticketID} className="ticket-change-button" type="button" onClick={handleRequest}>Request</button>
          <button id={ticketID} className="ticket-change-button" type="button" onClick={handleUpdate}>Update</button>
          <button id={ticketID} className="ticket-change-button" type="button" onClick={handleClose}>Close</button>
        </div>
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
        {loading ? <h1>Page Is Loading</h1> : <TicketView /> }
      </main> 
    </Fragment>
  );
}

export default EmployeeDashboard;