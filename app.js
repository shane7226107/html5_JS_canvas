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

  // socket.emit('news', { hello: 'world' });

  socket.on('click_push', function (data) {
    console.log(data);

    // broadcast to all users
    for (var u in users)    {
      // console.log(users[u].id);
      users[u].emit('click_pull', data);
    } 
  });
});

