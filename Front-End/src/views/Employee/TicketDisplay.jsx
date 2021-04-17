import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import { useAuth } from '../../services/auth';
import './EmployeeDashboard.css';

const TICKET_API_URL = `${process.env.TICKET_API_URL}/api`;

const TicketView = ({tickets}) => {
    const { token } = useAuth();
    const [activeDetails, setActiveDetails] = useState(null);
    const handleDetails = ({ target }) => {
      if (activeDetails === target.id) setActiveDetails(null); 
      else setActiveDetails(target.id);
    };
  
    function stringToDate(str) {
      return new Date().toISOString(str).replace('T', ' ').replace('-', '/').replace('-', '/').split('.')[0];
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
            <div key={ticket.id} className="active-ticket">
              <h3 className="main-info" id="ticket-title" >{ticket.title}</h3>
              <div className="ticket-body">
                <h4 className="main-info" >Ticket ID - {ticket.id}</h4>
                <p className="main-info" >
                  <b>Status - </b> {ticket.status === 0 ? 'Closed' : 'Open' }
                  &nbsp;<b>Priority - </b>{severityTraslation(ticket.ticket_severity)}
                </p>
                <p className="main-info"><b>Date Created - </b> {stringToDate(ticket.created)}</p>
                <p className="main-info" ><b>{ticketOwner.company}</b>: 
                  {ticketOwner.user_id} - {ticketOwner.first_name} {ticketOwner.last_name}</p>
                <p className="ticket-detail" >{ticket.body}</p>
                {parseInt(activeDetails, 10) === ticket.id
                ? <TicketNotesView
                  token={token}
                  ticketID={ticket.id}
                  setActiveDetails={setActiveDetails}
                  handleDetails={handleDetails}
                />
                : <button
                  className="ticket-button details-button"
                  type="button"
                  id={ticket.id}
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

const TicketNotesView = ({ticketID, setActiveDetails, handleDetails}) => {
const { token } = useAuth();
const [isLoadingNotes, setisLoadingNotes] = useState(true);
const [isSendingDetails, setIsSendingDetails] = useState(false);
const [notesError, setNotesError] = useState('');
const [ticketNotes, setTicketNotes] = useState([]);
const [noteInfo, setNoteInfo] = useState('');
const handleNoteInfo = ({ target }) => { setNoteInfo(target.value); };

const handleUpdate = () => {
    setIsSendingDetails(true);
    axios.post(`${TICKET_API_URL}/addnote`, 
    {params: { ticketID, body: noteInfo }}, 
    {headers: { Authorization: `Bearer ${token}` }},
    )
    .catch((err) => { setNotesError(err); })
    .finally(() => {
    setActiveDetails(null);
    setIsSendingDetails(false);
    });
};

const handleClose = () => {
    setIsSendingDetails(true);
    axios.post(`${TICKET_API_URL}/addnote`,
    {params: { ticketID, body: noteInfo }}, 
    {headers: { Authorization: `Bearer ${token}` }},
    )
    .catch((err) => { setNotesError(err); })
    .finally(() => { setActiveDetails(null); });

    axios.post(`${TICKET_API_URL}/updatestatus`,
    {params: { ticketID, status: 0 }}, 
    {headers: { Authorization: `Bearer ${token}` }},
    )
    .catch((err) => { setNotesError(err); })
    .finally(() => {
    setActiveDetails(null);
    setIsSendingDetails(false);
    });
};

useEffect(() => {
    axios.get(`${TICKET_API_URL}/ticketnotes`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { ticketID },
    })
    .then((response) => { setTicketNotes(response.data); })
    .catch((error) =>{ setNotesError(error); })
    .finally(() => { setisLoadingNotes(false); });
}, [token, ticketID]);

if (isLoadingNotes) { return <h3>Loading Notes</h3>; }
if (isSendingDetails) { return <h3>Sending Update to Database</h3>; }
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
        id="ticket-input"
        className="textarea"
        value={noteInfo}
        onChange={handleNoteInfo}
    />
    <div className="button-container" >
        <button className="ticket-button change-button" type="button" onClick={handleUpdate}>Update</button>
        <button className="ticket-button change-button" type="button" onClick={handleClose}>Close</button>
    </div>
    </div>
);
};

const TicketDisplay = ({tickets, sorters, activePage, ticketsPerPage}) => {
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
    return(
      <TicketView
        tickets={sortedTickets().slice(
          (activePage - 1) * ticketsPerPage,
          activePage * ticketsPerPage,
        )}/>
    );
};

TicketDisplay.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  sorters: PropTypes.string.isRequired,
  activePage: PropTypes.number.isRequired,
  ticketsPerPage: PropTypes.number.isRequired,
};
TicketView.propTypes = {
    tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
};
TicketNotesView.propTypes = {
    ticketID: PropTypes.number.isRequired,
    setActiveDetails: PropTypes.func.isRequired,
    handleDetails: PropTypes.func.isRequired,
};

export default TicketDisplay;