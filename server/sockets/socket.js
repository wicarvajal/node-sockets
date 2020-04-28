const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {
  console.log('usuario conectado');

  client.on('nextTicket', (data, callback) => {
    let next = ticketControl.nextTicket();
    callback(next);
  })

  client.emit('currentState', {
    currentTicket: ticketControl.getLastTicket()
  })

  // client.emit('sendMessage', {
  //   user: 'admin',
  //   msg: 'welcome admin'
  // })

  // client.on('disconnect', () => {
  //   console.log('usuario desconectado');
  // });

  // // escuchar cliente
  // client.on('sendMessage', (data, callback) => {
  //   console.log(data);

  //   // if (msg.user) {
  //   //   callback({
  //   //     resp: 'Success'
  //   //   });
  //   // } else {
  //   //   callback({
  //   //     resp: 'error callback'
  //   //   });
  //   // }
  // })
});