import allTickets from './allTickets';
import ticketDetails from './ticketDetails';

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

export { getTicketsCall, getTicketDetailsCall };
