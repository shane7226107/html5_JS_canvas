var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('*', function (req, res) {
  res.sendfile(__dirname + '/public/'+req.params[0]);
});

io.sockets.on('connection', function (socket) {

  //送出
  socket.emit('server_emitting', { data: 'hello, this is from server.' });
  
  //接收
  socket.on('client_emitting', function (data) {
    console.log(data);
  });
});