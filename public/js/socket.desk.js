var socket = io();

var searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('escritorio')) {
  window.location = 'index.html';
  throw new Error('El escritorio es necesario');
}

var desk = searchParams.get('escritorio');
var smallLabel = $('small');

$('h1').text(`Escritorio ${desk}`);

$('button').on('click', function () {
  socket.emit('attendTicket', { desk }, function (resp) {
    console.log(resp);
    if(resp == 'Sin tickets pendientes') {
      alert(resp);
      return;
    } else {
      smallLabel.text(`Ticket ${resp.number}`);
    }
  });
})

// var label = $('#lblNuevoTicket')

// socket.on('connect', () => {
//   console.log('Conectado al back');
// });

// socket.on('disconnect', () => {
//   console.log('perdio conexion al back');
// });

// socket.on('currentState', function(curr) {
//   label.text(curr.currentTicket);
// })

// $('button').on('click', ()=> {
//   socket.emit('nextTicket', null, function (next) {
//     console.log(next);
//     label.text(next);
//   })
// })