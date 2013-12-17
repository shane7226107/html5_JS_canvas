var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , users = [];

server.listen(3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('*', function (req, res) {
  res.sendfile(__dirname + '/public/'+req.params[0]);
});

io.sockets.on('connection', function (socket) {
  // Push users into the "classroom"
  users.push(socket);

  socket.emit('registration', socket.id);

  socket.on('click_push', function (data) {
    // broadcast to all users
    for (var u in users) {
      users[u].emit('click_pull', {
        data: data,
        id: users[u].id
      });
    } 
  });

  socket.on('clear_push', function (data) {
    // broadcast to all users
    for (var u in users) {
      users[u].emit('clear_pull',{
        id: users[u].id
      });
    } 
  });
});

