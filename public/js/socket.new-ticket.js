// import { io } from "../../server/server";

var socket = io();
var label = $('#lblNuevoTicket')

socket.on('connect', () => {
  console.log('Conectado al back');
});

socket.on('disconnect', () => {
  console.log('perdio conexion al back');
});

socket.on('currentState', function(curr) {
  label.text(curr.currentTicket);
})

$('button').on('click', ()=> {
  socket.emit('nextTicket', null, function (next) {
    console.log(next);
    label.text(next);
  })
})