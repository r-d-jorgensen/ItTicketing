import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Navbar from 'components/Navbar';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../services/auth';
import './EmployeeDashboard.css';

const TICKET_API_URL = 'http://localhost:8082'; //need to change to process.env.TICKET_API_URL once connected

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

const FilterView = ({tickets, setProcessedTickets}) => {
  const filters = [
    { name: 'Priority', values: ['All', 'Low', 'Mid', 'High', 'Urgent'] },
  ];

  const handlePrioityChange = ({ target: {value} }) => {
    setProcessedTickets(
      tickets.filter((ticket) => {
        if (value === 'All') return ticket; 
        return ticket.ticket_severity === value;
      }),
    );
  };

  return (
    <div className="control-section">
      <h2 className="control-header" >Filters</h2>
      <div className="grid-display">
        {filters.map(({ name, values }) =>
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

const SortView = ({tickets, setProcessedTickets}) => {
  const sorters = [
    { name: 'Title', values: ['A --> Z', 'Z --> A'] },
  ];

  const handlePrioityChange = () => {
    setProcessedTickets(
      tickets,
      //sort systems
    );
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

const TicketView = ({tickets, user}) => {
  const [activeDetails, setActiveDetails] = useState(null);
  const handleDetails = ({ target }) => {
    if (activeDetails === target.id) setActiveDetails(null); 
    else setActiveDetails(target.id);
  };

  return (
    <div className="tickets-container">
      <h1 id="main-title">Tickets</h1>
      {tickets.map((ticket) => {
        const ticketNote = ticket.ticket_note;
        return (
          <div key={ticket.ticket_id} className="active-ticket">
            <h3 className="main-info" id="ticket-title" >{ticket.ticketTitle}</h3>
            <div className="ticket-body">
              <h4 className="main-info" >Ticket ID - {ticket.ticket_id}</h4>
              <p className="main-info" ><b>Priority - </b>{ticket.ticket_severity}</p>
              <p className="main-info" ><b>{ticket.company}</b>: 
                {ticket.ticketOwnerID} - 
                {ticket.first_name} {ticket.last_name}</p>
              {parseInt(activeDetails, 10) === ticket.ticket_id
              ? <TicketNotesView
                user={user}
                ticketID={ticket.ticket_id}
                setActiveDetails={setActiveDetails}
                handleDetails={handleDetails}
              />
              : <div key={ticketNote.note_id}>
                <div className="ticket-detail">
                  <h5>{ticketNote.title}: 
                    {ticketNote.user_id} - 
                    {ticketNote.first_name} {ticketNote.last_name}</h5>
                  <p>&emsp;{ticketNote.body}</p>
                </div>
                <button
                  className="ticket-button details-button"
                  type="button"
                  id={ticket.ticket_id}
                  onClick={handleDetails}>
                    Expand Details
                </button>
              </div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const TicketNotesView = ({user, ticketID, setActiveDetails, handleDetails}) => {
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
    axios(`${TICKET_API_URL}/api/ticket/notes`)
    .then((response) => {
      setTicketNotes(response.data.ticket_notes);
    })
    .catch((error) =>{
      setNotesError(error);
    })
    .finally(() => {
      setisLoadingNotes(false);
    });
  }, [user]);

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
  const { user } = useAuth();
  const ticketsPerPage = 4;
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setPage] = useState(1);
  const [tickets, setTickets] = useState([]);
  const [processedTickets, setProcessedTickets] = useState([]);
  const [ticketError, setTicketError] = useState(null);

  useEffect(() => {
    axios(`${TICKET_API_URL}/api/tickets`)
    .then((response) => {
      setTickets(response.data.tickets);
      setProcessedTickets(response.data.tickets);
    })
    .catch((error) =>{
      setTicketError(error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [user]);

  const MainDisplay = () => {
    if (isLoading) {
      return <h1>Loading Tickets</h1>;
    } 
    if (ticketError) {
      return (
        <div>
          <h1>An Error Occoured when calling Server</h1>
          <h4 className="error">{`${ticketError}`}</h4>
        </div>
      );
    }
    return(
      <TicketView
        tickets={processedTickets.slice((activePage-1)*ticketsPerPage, activePage*ticketsPerPage)}
        user={user}/>
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
            tickets={processedTickets}/>
          <FilterView
            tickets={tickets}
            setProcessedTickets={setProcessedTickets}/>
          <SortView
            tickets={tickets}
            setProcessedTickets={setProcessedTickets}/>
          <PageButtons
            setPage={setPage}
            ticketsPerPage={ticketsPerPage}
            tickets={processedTickets}/>
        </div>
        <MainDisplay />
      </main>
    </Fragment>
  );
}

const userShape = {
  id: PropTypes.number.isRequired,
  user_type: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  phone_number: PropTypes.string,
};

PageButtons.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPage: PropTypes.func.isRequired,
  ticketsPerPage: PropTypes.number.isRequired,
};

FilterView.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  setProcessedTickets: PropTypes.func.isRequired,
};

SortView.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  setProcessedTickets: PropTypes.func.isRequired,
};

TicketView.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

TicketNotesView.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
  ticketID: PropTypes.number.isRequired,
  setActiveDetails: PropTypes.func.isRequired,
  handleDetails: PropTypes.func.isRequired,
};

export default EmployeeDashboard;

/*
mockoon data for tickets at http://localhost:8082/api/tickets
{
  "tickets": [
    {{#repeat 50}}
    {
      "ticket_id": {{ faker 'random.number' min=10000 max=100000 }},
      "title": "{{ faker 'lorem.words' }}",
      "first_name": "{{ faker 'name.firstName' }}",
      "last_name": "{{ faker 'name.lastName' }}",
      "company": "{{ faker 'company.bs' }}",
      "ticket_severity": "{{ oneOf (array 'Low' 'Mid' 'High' 'Urgent' ) }}",
      "ticket_notes": {
        "note_id": {{ faker 'random.number' min=10000 max=100000 }},
        "user_id": {{ faker 'random.number' min=10000 max=100000 }},
        "title": "{{ oneOf (array 'Admin' 'Tech' 'Customer' ) }}",
        "first_name": "{{ faker 'name.firstName' }}",
        "last_name": "{{ faker 'name.lastName' }}",
        "body": "{{ faker 'lorem.paragraph' }}"
      }
    }
    {{/repeat}}
  ]
}

mockoon data for tickets at http://localhost:8082/api/details
{
  "ticket_notes": [
    {{#repeat 5}}
    {
      "note_id": {{ faker 'random.number' min=10000 max=100000 }},
      "user_id": {{ faker 'random.number' min=10000 max=100000 }},
      "title": "{{ oneOf (array 'Admin' 'Tech' 'Customer' ) }}",
      "first_name": "{{ faker 'name.firstName' }}",
      "last_name": "{{ faker 'name.lastName' }}",
      "body": "{{ faker 'lorem.paragraph' }}"
      }
    {{/repeat}}
  ]
}
*/