import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Navbar from 'components/Navbar';
import Button from '../../components/Button';
import Input from '../../components/Input';
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

const FilterView = ({token, setIsLoading, setTickets, setTicketError}) => {
  const defalutFilters = { priority: undefined, closed: 1, date: undefined };
  const [filters, setfilters] = useState(defalutFilters);
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
    changedFilters[name] = filterRadioTraslation(value);
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
    //reset the radio buttons
    setfilters(defalutFilters);
    setIsLoading(true);
    axios.get(`${TICKET_API_URL}/tickets`, {
      params: { filters: defalutFilters },
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
                  defaultChecked={value === 'All' || value === 'Open' ? true : false}
                  onClick={handleParamChange} />
                <label className="grid-lable" htmlFor={value}>{value}&nbsp;</label>
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

  const handlePrioityChange = ({ target: {value} }) => {
    setSorters(value);
  };

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

const TicketView = ({tickets, token}) => {
  const [activeDetails, setActiveDetails] = useState(null);
  const handleDetails = ({ target }) => {
    if (activeDetails === target.id) setActiveDetails(null); 
    else setActiveDetails(target.id);
  };

  function stringToDate(str) {
    return new Date().toISOString(str).replace('T', ' ')
      .replace('-', '/').replace('-', '/').split('.')[0];
  }

  function severityTraslation(value) {
    switch(value) {
      case 1: return 'Low';
      case 2: return 'Mild';
      case 3: return 'High';
      case 4: return 'Urgent';
      default: return 'Error in database storage of ticket severity';
    }
  }

  return (
    <div className="tickets-container">
      <h1 id="main-title">Tickets</h1>
      {tickets.map((ticket) => {
        const ticketOwner = {user_id: 1234, company: 'Big Tech', first_name: 'Bob', last_name: 'Bill'};
        return (
          <div key={ticket.ticket_id} className="active-ticket">
            <h3 className="main-info" id="ticket-title" >{ticket.title}</h3>
            <div className="ticket-body">
              <h4 className="main-info" >Ticket ID - {ticket.ticket_id}</h4>
              <p className="main-info" >
                <b>Status - </b> {ticket.status === 0 ? 'Closed' : 'Open' }
                &nbsp;<b>Priority - </b>{severityTraslation(ticket.ticket_severity)}
              </p>
              <p className="main-info"><b>Date Created - </b> {stringToDate(ticket.created)}</p>
              <p className="main-info" ><b>{ticketOwner.company}</b>: 
                {ticketOwner.user_id} - {ticketOwner.first_name} {ticketOwner.last_name}</p>
              <p className="ticket-detail" >{ticket.body}</p>
              {parseInt(activeDetails, 10) === ticket.ticket_id
              ? <TicketNotesView
                token={token}
                ticketID={ticket.ticket_id}
                setActiveDetails={setActiveDetails}
                handleDetails={handleDetails}
              />
              : <button
                className="ticket-button details-button"
                type="button"
                id={ticket.ticket_id}
                onClick={handleDetails}>
                  Expand Details
              </button>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const TicketNotesView = ({token, ticketID, setActiveDetails, handleDetails}) => {
  const [isLoadingNotes, setisLoadingNotes] = useState(true);
  const [notesError, setNotesError] = useState('');
  const [ticketNotes, setTicketNotes] = useState([]);
  const [ticketChange, setTicketChange] = useState('');

  const handleTicketChange = ({ target }) => {
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
    //TODO: needs to be changed when api is made
    //`${TICKET_API_URL}/tickets/notes`
    axios('http://localhost:8082/api/ticket/notes')
    .then((response) => {
      setTicketNotes(response.data.ticket_notes);
    })
    .catch((error) =>{
      setNotesError(error);
    })
    .finally(() => {
      setisLoadingNotes(false);
    });
  }, [token]);

  if (isLoadingNotes) {
    return <h3>Loading Notes</h3>;
  }

  if (notesError) {
    return (
      <div>
        <h3>Error Calling Server</h3>
        <p className="error">{`${notesError}`}</p>
      </div>
    );
  }

  return (
    <div >
      {ticketNotes.map((note) =>
        <div key={note.note_id} className="ticket-detail" >
          <h5>{note.title}: {note.user_id} - {note.first_name} {note.last_name}</h5>
          <p>&emsp;{note.body}</p>
        </div>,
      )}
      <Button className="ticket-button details-button" id={ticketID} onClick={handleDetails}>Collapse Details</Button>
      <textarea
        name="ticketChange"
        id="ticket-input"
        className="textarea"
        value={ticketChange}
        onChange={handleTicketChange}
      />
      <div className="button-container" >
        <button id={ticketID} className="ticket-button change-button" type="button" onClick={handleRequest}>Request</button>
        <button id={ticketID} className="ticket-button change-button" type="button" onClick={handleUpdate}>Update</button>
        <button id={ticketID} className="ticket-button change-button" type="button" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

function EmployeeDashboard() {
  const ticketsPerPage = 4;
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setPage] = useState(1);
  const [tickets, setTickets] = useState([]);
  const [sorters, setSorters] = useState('');
  const [ticketError, setTicketError] = useState(null);

  useEffect(() => {
    axios.get(`${TICKET_API_URL}/tickets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setTickets(response.data);
    })
    .catch((error) =>{
      setTicketError(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [token]);

  const sortedTickets = () => {
    if (sorters === 'A --> Z') {
      return tickets.sort((a, b) => {
        const fa = a.title.toLowerCase();
        const fb = b.title.toLowerCase();
        if (fa < fb) { return -1; }
        if (fa > fb) { return 1; }
        return 0;
      });
    }
    if (sorters === 'Z --> A') {
      return tickets.sort((b, a) => {
        const fa = a.title.toLowerCase();
        const fb = b.title.toLowerCase();
        if (fa < fb) { return -1; }
        if (fa > fb) { return 1; }
        return 0;
      });
    }
    return tickets;
  };

  const MainDisplay = () => {
    if (isLoading) {
      return <h1 className="nonTicket-display">Loading Tickets</h1>;
    } 
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
    return(
      <TicketView
        tickets={sortedTickets().slice((activePage-1)*ticketsPerPage, activePage*ticketsPerPage)}
        token={token}/>
    );
  };

  return (
    <Fragment>
      <Navbar />
      <main className="employee-dashboard">
        <div className="controls-container">
          <PageButtons
            setPage={setPage}
            ticketsPerPage={ticketsPerPage}
            tickets={tickets}/>
          <FilterView
            token={token}
            setIsLoading={setIsLoading}
            setTickets={setTickets}
            setTicketError={setTicketError}/>
          <SortView
            setSorters={setSorters}/>
          <PageButtons
            setPage={setPage}
            ticketsPerPage={ticketsPerPage}
            tickets={tickets}/>
        </div>
        <MainDisplay />
      </main>
    </Fragment>
  );
}
/*
const userShape = {
  id: PropTypes.number.isRequired,
  user_type: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  phone_number: PropTypes.string,
};
*/
PageButtons.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPage: PropTypes.func.isRequired,
  ticketsPerPage: PropTypes.number.isRequired,
};

FilterView.propTypes = {
  token: PropTypes.string.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setTickets: PropTypes.func.isRequired,
  setTicketError: PropTypes.func.isRequired,
};

SortView.propTypes = {
  setSorters: PropTypes.func.isRequired,
};

TicketView.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  token: PropTypes.string.isRequired,
};

TicketNotesView.propTypes = {
  token: PropTypes.string.isRequired,
  ticketID: PropTypes.number.isRequired,
  setActiveDetails: PropTypes.func.isRequired,
  handleDetails: PropTypes.func.isRequired,
};

export default EmployeeDashboard;

/*
mockoon data for tickets at http://localhost:8082/api/details
{
  "ticket_notes": [
    {{#repeat 5}}
    {
      "note_id": {{ faker 'random.number' min=10000 max=100000 }},
      "user_id": {{ faker 'random.number' min=10000 max=100000 }},
      "user_title": "{{ oneOf (array 'Admin' 'Tech' 'Customer' ) }}",
      "first_name": "{{ faker 'name.firstName' }}",
      "last_name": "{{ faker 'name.lastName' }}",
      "body": "{{ faker 'lorem.paragraph' }}"
      }
    {{/repeat}}
  ]
}
*/