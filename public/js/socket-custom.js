var socket = io();

socket.on('connect', () => {
  console.log('Conectado al back');
});

socket.on('disconnect', () => {
  console.log('perdio conexion al back');
});

// enviar info
socket.emit('sendMessage', {
  user: 'Willy',
  msg: 'hi world'
}, (resp) => {
  console.log(resp);
});

// recibir info
socket.on('sendMessage', (msg) => {
  console.log(msg);
});