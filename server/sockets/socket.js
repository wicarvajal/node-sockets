const {io} = require('../server');

io.on('connection', (client) => {
  console.log('usuario conectado');

  client.emit('sendMessage', {
    user: 'admin',
    msg: 'welcome admin'
  })

  client.on('disconnect', () => {
    console.log('usuario desconectado');
  });

  // escuchar cliente
  client.on('sendMessage', (data, callback) => {
    console.log(data);

    // if (msg.user) {
    //   callback({
    //     resp: 'Success'
    //   });
    // } else {
    //   callback({
    //     resp: 'error callback'
    //   });
    // }
  })
});