import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Navbar from 'components/Navbar';
import Input from '../../components/Input';
import TicketDisplay from './TicketDisplay';
import { useAuth } from '../../services/auth';
import styles from './EmployeeDashboard.css';

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
    <div className={styles['page-button-container']}>
      <h2 className={styles['control-header']}>Pages</h2>
      <div className={styles['page-button-display']}>
        {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNumber) =>
          <button
            key={pageNumber}
            type="button"
            className={styles['page-button']}
            value={pageNumber}
            onClick={handlePageEvent} >
            {(pageNumber).toString()}
          </button>,
        )}
        <Input
          name="userPage"
          className={styles['user-page-input']}
          value={userPage}
          type="number"
          onChange={handleUserPage} />
        <button
          type="button"
          name="customPageRequest"
          className={styles['page-button']}
          value={userPage}
          onClick={handlePageEvent}
        >GO
        </button>
        {userPageError ? <p className={styles.error} ><b>{userPageError}</b></p> : ''}
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
    <div className={styles['control-section']}>
      <h2 className={styles['control-header']} >Filters</h2>
      <div className={styles['grid-display']}>
        {filterRadioSets.map(({ name, values }) =>
        <div key={name} className={styles['grid-set']} >
          <h5 className={styles['grid-setname']}>{name}</h5>
          {values.map((value) =>
          <div key={value} className={styles['grid-values']}>
            <input
              className={styles['grid-input']}
              type="radio"
              name={name}
              value={value}
              defaultChecked={value === 'All' || value === 'Open'}
              onClick={handleParamChange} />
            <label className={styles['grid-label']} htmlFor={value}>{value}&nbsp;</label>
          </div>,
          )}
        </div>,
        )}
      </div>
      <button type="button" className={styles['control-button']} onClick={resetFilters} >RESET FILTERS</button>
    </div>
  );
};

const SortView = ({setSorter}) => {
  const sorterSets = [
    { name: 'title', values: ['A --> Z', 'Z --> A'] },
    { name: 'date', values: ['Youngest', 'Oldest'] },
  ];

  const handlePrioityChange = ({ target: { value } }) => { setSorter(value); };

  return (
    <div className={styles['control-section']}>
      <h2 className={styles['control-header']} >Sorters</h2>
      <div className={styles['grid-display']}>
        {sorterSets.map(({ name, values }) =>
        <div key={name} className={styles['grid-set']} >
          <h5 className={styles['grid-setname']}>{name}</h5>
          {values.map((value) =>
          <div key={value} className={styles['grid-values']}>
            <input className={styles['grid-input']} type="radio" name={name} value={value} onClick={handlePrioityChange} />
            <label className={styles['grid-lable']} htmlFor={value}>{value}&nbsp;</label>
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
  const [sorter, setSorter] = useState('');
  const [ticketError, setTicketError] = useState(null);

  useEffect(() => {
    axios.get(`${TICKET_API_URL}/tickets`, { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => { setTickets(response.data); })
    .catch((error) =>{ setTicketError(error); })
    .finally(() => { setIsLoading(false); });
  }, [token]);

  const MainDisplay = () => {
    if (isLoading) { return <h1 className={styles['nonTicket-display']}>Loading Tickets</h1>; } 
    if (ticketError) {
      return (
        <div className={styles['nonTicket-display']}>
          <h1>An Error Occoured when calling Server</h1>
          <h4 className={styles.error}>{`${ticketError}`}</h4>
        </div>
      );
    }
    if (tickets.length === 0) {
      return (
        <div className={styles['nonTicket-display']}>
          <h1 className={styles.error}>There are no Tickets that match those filters</h1>
          <h2>Or</h2>
          <h1 className={styles.success}>There are no more tickets assigned to You</h1>
        </div>
      );
    }
    return (
      <TicketDisplay
        isLoading={isLoading}
        ticketError={ticketError}
        tickets={tickets}
        sorter={sorter}
        activePage={activePage}
        ticketsPerPage={ticketsPerPage} />
    );
  };

  return (
    <Fragment>
      <Navbar />
      <main className={styles['employee-dashboard']}>
        <div className={styles['controls-container']}>
          <PageButtons setPage={setPage} ticketsPerPage={ticketsPerPage} tickets={tickets}/>
          <FilterView
            setIsLoading={setIsLoading}
            setTickets={setTickets}
            setTicketError={setTicketError}/>
          <SortView setSorter={setSorter}/>
          <PageButtons setPage={setPage} ticketsPerPage={ticketsPerPage} tickets={tickets}/>
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
  setSorter: PropTypes.func.isRequired,
};

export default EmployeeDashboard;