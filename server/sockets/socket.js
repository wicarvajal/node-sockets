const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();

io.on('connection', (client) => {
  console.log('usuario conectado');

  client.on('nextTicket', (data, callback) => {
    let next = ticketControl.nextTicket();
    callback(next);
  });

  client.emit('currentState', {
    currentTicket: ticketControl.getLastTicket(),
    lastFour: ticketControl.getLastFour()
  });

  client.on('attendTicket', (data, callback) => {
    console.log(data.desk);
    if(!data.desk){
      return callback({
        err: true,
        msg: 'Escritorio es necesario'
      });
    }

    let attendTicket = ticketControl.attendTicket(data.desk);

    callback(attendTicket);

    // Actualizar notificar cambios en los ultimos 4

    client.broadcast.emit('updateLastFour', {
      lastFour: ticketControl.getLastFour()
    });
  });

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