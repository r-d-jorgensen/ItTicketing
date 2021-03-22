function ticketsShallowCall(filter, page) {
  //console.log(filter + ' ' + page);
  const tickets = [
    {id: '12345', ticketOwner: 'Homer Stevenson', company: 'Fix-It', title: 'Email not sending attachments',  priority: 'Urgent',
      details: {userTitle: 'Tech', user: 'Steve', content: 'The email is currently not sending attachments that are meant to go with it.'}},
    {id: '4651', ticketOwner: 'John Jacobson', company: 'Big Stuff',  title: 'Stuff',  priority: 'Low',
      details: {userTitle: 'Tech', user: 'Steve', content: 'The email is currently not sending attachments that are meant to go with it.'}},
    {id: '4843216', ticketOwner: 'Bob Levy', company: 'Fix-It', title: 'Unable to add ',  priority: 'Mid',
      details: {userTitle: 'Ticket Owner', user: 'James', content: 'The email is currently not sending attachments that are meant to go with it.'}},
  ];
  
  return tickets;
}

export {
  ticketsShallowCall,
};