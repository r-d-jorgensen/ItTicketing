function ticketsCall(filter) {
  //console.log(filter + ' ' + page);
  const tickets = [
    {id: '12345', ticketOwner: 'Homer Stevenson', company: 'Fix-It', title: 'Email not sending attachments',  priority: 'Urgent',
      details: {userTitle: 'Tech', user: 'Bob',
        content: 'The email is currently not sending attachments that are meant to go with it.'}},
    {id: '4651', ticketOwner: 'John Jacobson', company: 'Big Stuff',  title: 'Stuff',  priority: 'Low',
      details: {userTitle: 'Tech', user: 'Bob',
        content: 'The email is currently not sending attachments that are meant to go with it.'}},
    {id: '4843216', ticketOwner: 'Bob Levy', company: 'Fix-It', title: 'Unable to add ',  priority: 'Mid',
      details: {userTitle: 'Ticket Owner', user: 'Bob',
        content: 'The email is currently not sending attachments that are meant to go with it.'}},
    {id: '1745632345', ticketOwner: 'Homer Stevenson', company: 'Fix-It', title: 'Email not sending attachments',  priority: 'Urgent',
      details: {userTitle: 'Tech', user: 'Bob',
        content: 'The email is currently not sending attachments that are meant to go with it.'}},
    {id: '8765', ticketOwner: 'John Jacobson', company: 'Big Stuff',  title: 'Stuff',  priority: 'Low',
      details: {userTitle: 'Tech', user: 'Bob5',
        content: 'The email is currently not sending attachments that are meant to go with it.'}},
    {id: '54562', ticketOwner: 'Bob Levy', company: 'Fix-It', title: 'Unable to add ',  priority: 'Mid',
      details: {userTitle: 'Ticket Owner', user: 'Bob',
        content: 'The email is currently not sending attachments that are meant to go with it.'}},
    {id: '23452', ticketOwner: 'Homer Stevenson', company: 'Fix-It', title: 'Email not sending attachments',  priority: 'Urgent',
      details: {userTitle: 'Tech', user: 'Bob',
        content: 'The email is currently not sending attachments that are meant to go with it.'}},
    {id: '464523675751', ticketOwner: 'John Jacobson', company: 'Big Stuff',  title: 'Stuff',  priority: 'Low',
      details: {userTitle: 'Tech', user: 'Bob',
        content: 'The email is currently not sending attachments that are meant to go with it.'}},
    {id: '45646465843216', ticketOwner: 'Bob Levy', company: 'Fix-It', title: 'Unable to add ',  priority: 'Mid',
      details: {userTitle: 'Ticket Owner', user: 'Bob',
        content: 'The email is currently not sending attachments that are meant to go with it.'}},
    {id: '876599o95', ticketOwner: 'Homer Stevenson', company: 'Fix-It', title: 'Email not sending attachments',  priority: 'Urgent',
      details: {userTitle: 'Tech', user: 'Bob',
        content: 'The email is currently not sending attachments that are meant to go with it.'}},
    {id: '342467', ticketOwner: 'John Jacobson', company: 'Big Stuff',  title: 'Stuff',  priority: 'Low',
      details: {userTitle: 'Tech', user: 'Bob',
        content: 'The email is currently not sending attachments that are meant to go with it.'}},
    {id: '4846589523216', ticketOwner: 'Bob Levy', company: 'Fix-It', title: 'Unable to add ',  priority: 'Mid',
      details: {userTitle: 'Ticket Owner', user: 'Bob',
        content: 'The email is currently not sending attachments that are meant to go with it.'}},
    {id: '3123132', ticketOwner: 'Bob Levy', company: 'Fix-It', title: 'Unable to add ',  priority: 'Mid',
      details: {userTitle: 'Ticket Owner', user: 'Bob',
        content: 'The email is currently not sending attachments that are meant to go with it.'}},
  ];
  
  return tickets;
}

export {
  ticketsCall,
};