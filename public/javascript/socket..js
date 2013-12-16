var socket = io.connect('http://localhost');

socket.on('server_emitting', function (data) {

  console.log(data);

  socket.emit('client_emitting', { data: 'Hi, this is from client.' });
});