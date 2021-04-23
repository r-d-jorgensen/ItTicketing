import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import { useAuth } from '../../services/auth';
import styles from './TicketDisplay.css';

const TICKET_API_URL = `${process.env.TICKET_API_URL}/api`;

const TicketView = ({tickets}) => {
  const { token } = useAuth();
  const [activeDetails, setActiveDetails] = useState('');
  const handleDetails = ({ target }) => {
    if (activeDetails === target.id) setActiveDetails(''); 
    else setActiveDetails(target.id);
  };

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
    <div className={styles['tickets-container']}>
      <h1 id="main-title">Ticket</h1>
      {tickets.map((ticket) => 
      <div key={ticket.id} className={styles['active-ticket']}>
        <h3 className={styles['main-info']} id="ticket-title" >{ticket.title}</h3>
        <div className={styles['ticket-body']}>
          <h4 className={styles['main-info']} >Ticket ID - {ticket.id}</h4>
          <p className={styles['main-info']} >
            <b>Status - </b> {ticket.status === 0 ? 'Closed' : 'Open' }
            &nbsp;<b>Priority - </b>{severityTraslation(ticket.ticket_severity)}
          </p>
          <p className={styles['main-info']}><b>Date Created - </b> {new Date(ticket.created).toUTCString()}</p>
          <p className={styles['main-info']} ><b>{ticket.owner.company}</b>: 
            {ticket.owner.id} - {ticket.owner.first_name} {ticket.owner.last_name}</p>
          <p className={styles['ticket-detail']} >&emsp;{ticket.body}</p>
          <TicketNotesView
            token={token}
            ticketID={ticket.id}
            activeDetails={activeDetails}
            setActiveDetails={setActiveDetails}
            handleDetails={handleDetails}
          />
        </div>
      </div>)}
    </div>
  );
};

const TicketNotesView = ({ticketID, activeDetails, setActiveDetails, handleDetails}) => {
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
      <p className={styles.error}>{`${notesError}`}</p>
    </div>
    );
  }

  if (parseInt(activeDetails, 10) !== ticketID) {
    return (
      <button
        className={`${styles['ticket-button']} ${styles['details-button']}`}
        type="button"
        id={ticketID}
        onClick={handleDetails}>
        Expand Details
      </button>
    );
  }
  //should be replaced when API sends right data
  const noteOwner = {userID: 123456, title: 'Tech', firstName: 'Steve', lastName: 'Johnson'};
  return (
    <div >
      {ticketNotes.map((note) =>
      <div key={note.note_id} className={styles['ticket-detail']} >
        <h5>{noteOwner.title}: {noteOwner.userID} - {noteOwner.firstName} {noteOwner.lastName}</h5>
        <p>&emsp;{note.body}</p>
      </div>,
      )}
      <textarea id="ticket-input" className={styles.textarea} onChange={handleNoteInfo}/>
      <div className={styles['button-container']}>
        <button className={`${styles['ticket-button']} ${styles['change-button']}`} type="button" onClick={handleUpdate}>Update</button>
        <button className={`${styles['ticket-button']} ${styles['change-button']}`} type="button" onClick={handleClose}>Close</button>
      </div>
      <Button className={`${styles['ticket-button']} ${styles['details-button']}`} id={ticketID} onClick={handleDetails}>Collapse Details</Button>
    </div>
  );
};

const TicketDisplay = ({tickets, sorter, activePage, ticketsPerPage}) => {
  const sortedTickets = () => {
    if (sorter === 'A --> Z') {
      return tickets.sort((a, b) => {
        const fa = a.title.toLowerCase();
        const fb = b.title.toLowerCase();
        if (fa < fb) { return -1; }
        if (fa > fb) { return 1; }
        return 0;
      });
    }
    if (sorter === 'Z --> A') {
      return tickets.sort((b, a) => {
        const fa = a.title.toLowerCase();
        const fb = b.title.toLowerCase();
        if (fa < fb) { return -1; }
        if (fa > fb) { return 1; }
        return 0;
      });
    }
    if (sorter === 'Youngest') {
      return tickets.sort((a, b) => {
        const fa = new Date(a.created).getTime();
        const fb = new Date(b.created).getTime();
        if (fa < fb) { return -1; }
        if (fa > fb) { return 1; }
        return 0;
      });
    }
    if (sorter === 'Oldest') {
      return tickets.sort((b, a) => {
        const fa = new Date(a.created).getTime();
        const fb = new Date(b.created).getTime();
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
  sorter: PropTypes.string.isRequired,
  activePage: PropTypes.number.isRequired,
  ticketsPerPage: PropTypes.number.isRequired,
};

TicketView.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
};
TicketNotesView.propTypes = {
  ticketID: PropTypes.number.isRequired,
  activeDetails: PropTypes.string,
  setActiveDetails: PropTypes.func.isRequired,
  handleDetails: PropTypes.func.isRequired,
};
TicketNotesView.defaultProps = {
  activeDetails: null,
};

export default TicketDisplay;