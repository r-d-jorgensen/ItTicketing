import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Navbar from 'components/Navbar';
import Input from '../../components/Input';
import TicketDisplay from './TicketDisplay';
import { useAuth } from '../../services/auth';
import './EmployeeDashboard.css';

const TICKET_API_URL = `${process.env.TICKET_API_URL}/api`;

const PageButtons = ({tickets, setPage, ticketsPerPage}) => {
  const [userPage, setUserPage] = useState(1);
  const [userPageError, setUserPageError] = useState(null);
  const handleUserPage = ({ target }) => { setUserPage(target.value); };
  const numPages = Math.ceil(tickets.length / ticketsPerPage);

  const handlePageEvent = ({ target }) => {
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
        {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNumber) =>
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
        {userPageError ? <p className="error" ><b>{userPageError}</b></p> : ''}
      </div>
    </div>
  );
};

const FilterView = ({setIsLoading, setTickets, setTicketError}) => {
  const { token } = useAuth();
  const defaultFilters = {
    priority: undefined,
    status: 1,
  };
  const [filters, setfilters] = useState(defaultFilters);
  const filterRadioSets = [
    { name: 'priority', values: ['Low', 'Mild', 'High', 'Urgent', 'All'] },
    { name: 'status', values: ['Open', 'Closed', 'Both']},
  ];

  function filterRadioTraslation(value) {
    switch(value) {
      //priority
      case 'Low': return 1;
      case 'Mild': return 2;
      case 'High': return 3;
      case 'Urgent': return 4;
      case 'All' : return undefined;
      //status
      case 'Closed': return 0;
      case 'Open': return 1;
      case 'Both' : return undefined;
      default: return 'Bad filter value';
    }
  }

  const handleParamChange = ({ target: {name, value} }) => {
    const changedFilters = filters;

    if (name === 'priority' || name === 'status') {
      changedFilters[name] = filterRadioTraslation(value);
    } else { changedFilters[name] = value; }
    setfilters(changedFilters);
    setIsLoading(true);
    
    axios.get(`${TICKET_API_URL}/tickets`, {
      params: { filters: changedFilters },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => { setTickets(response.data); })
    .catch((error) =>{ setTicketError(error); })
    .finally(() => { setIsLoading(false); });
  };

  const resetFilters = () => {
    setfilters(defaultFilters);
    setIsLoading(true);
    axios.get(`${TICKET_API_URL}/tickets`, {
      params: { filters: defaultFilters },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => { setTickets(response.data); })
    .catch((error) =>{ setTicketError(error); })
    .finally(() => { setIsLoading(false); });
  };

  return (
    <div className="control-section">
      <h2 className="control-header" >Filters</h2>
      <div className="grid-display">
        {filterRadioSets.map(({ name, values }) =>
          <div key={name} className="grid-set" >
            <h5 className="grid-setname">{name}</h5>
            {values.map((value) =>
              <div key={value} className="grid-values">
                <input
                  className="grid-input"
                  type="radio"
                  name={name}
                  value={value}
                  defaultChecked={value === 'All' || value === 'Open'}
                  onClick={handleParamChange} />
                <label className="grid-label" htmlFor={value}>{value}&nbsp;</label>
              </div>,
            )}
          </div>,
        )}
      </div>
      <button type="button" className="ticket-button details-button" onClick={resetFilters} >RESET FILTERS</button>
    </div>
  );
};

const SortView = ({setSorters}) => {
  const sorters = [
    { name: 'Title', values: ['A --> Z', 'Z --> A']},
  ];

  const handlePrioityChange = ({ target: {value} }) => { setSorters(value); };

  return (
    <div className="control-section">
      <h2 className="control-header" >Sorters</h2>
      <div className="grid-display">
        {sorters.map(({ name, values }) =>
          <div key={name} className="grid-set" >
            <h5 className="grid-setname">{name}</h5>
            {values.map((value) =>
              <div key={value} className="grid-values">
                <input className="grid-input" type="radio" name={name} value={value} onClick={handlePrioityChange} />
                <label className="grid-lable" htmlFor={value}>{value}&nbsp;</label>
              </div>,
            )}
          </div>,
        )}
      </div>
    </div>
  );
};

const EmployeeDashboard = () => {
  const ticketsPerPage = 4;
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setPage] = useState(1);
  const [tickets, setTickets] = useState([]);
  const [sorters, setSorters] = useState('');
  const [ticketError, setTicketError] = useState(null);

  useEffect(() => {
    axios.get(`${TICKET_API_URL}/tickets`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => { setTickets(response.data); })
    .catch((error) =>{ setTicketError(error); })
    .finally(() => { setIsLoading(false); });
  }, [token]);

  const MainDisplay = () => {
    if (isLoading) { return <h1 className="nonTicket-display">Loading Tickets</h1>; } 
    if (ticketError) {
        return (
        <div className="nonTicket-display">
            <h1>An Error Occoured when calling Server</h1>
            <h4 className="error">{`${ticketError}`}</h4>
        </div>
        );
    }
    if (tickets.length === 0){
        return (
        <div className="nonTicket-display">
            <h1 className="error">There are no Tickets that match those filters</h1>
            <h2>Or</h2>
            <h1 className="success">There are no more tickets assigned to You</h1>
        </div>
        );
    }
    return (
      <TicketDisplay
          isLoading={isLoading}
          ticketError={ticketError}
          tickets={tickets}
          sorters={sorters}
          activePage={activePage}
          ticketsPerPage={ticketsPerPage} />
    );
  }

  return (
    <Fragment>
      <Navbar />
      <main className="employee-dashboard">
        <div className="controls-container">
        <PageButtons setpage={setPage} ticketsPerPage={ticketsPerPage} tickets={tickets}/>
          <FilterView
            setIsLoading={setIsLoading}
            setTickets={setTickets}
            setTicketError={setTicketError}/>
          <SortView setSorters={setSorters}/>
          <PageButtons setpage={setPage} ticketsPerPage={ticketsPerPage} tickets={tickets}/>
        </div>
        <MainDisplay />
      </main>
    </Fragment>
  );
};

PageButtons.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPage: PropTypes.func.isRequired,
  ticketsPerPage: PropTypes.number.isRequired,
};
FilterView.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
  setTickets: PropTypes.func.isRequired,
  setTicketError: PropTypes.func.isRequired,
};
SortView.propTypes = {
  setSorters: PropTypes.func.isRequired,
};

export default EmployeeDashboard;