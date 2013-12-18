var app = require('express')(),
    sugar = require('sugar'),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    classrooms = [[],[]];

server.listen(3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('*', function (req, res) {
  res.sendfile(__dirname + '/public/'+req.params[0]);
});

io.sockets.on('connection', function (socket) {

  socket.classroom = 0;
  
  // Push users into the "classroom"
  classrooms[socket.classroom].push(socket);

  socket.emit('registration', socket.id);

  socket.on('click_push', function (data) {
    // broadcast to all users
    classrooms[this.classroom].each(function(skt){
      skt.emit('click_pull',{
        data: data,
        id: socket.id
      });
    }); 
  });

  socket.on('clear_push', function (data) {
    // broadcast to all users
    classrooms[this.classroom].each(function(skt){
      skt.emit('clear_pull',{
        id: socket.id
      });
    });
  });

  socket.on('switch_classroom', function (to_classroom) {
    classrooms[this.classroom].remove(this);
    classrooms[to_classroom].push(this);
    this.classroom = to_classroom;
  });

  socket.on('movement_push', function (data) {
    // broadcast to all users
    classrooms[this.classroom].each(function(skt){
      skt.emit('movement_pull',{
        data: data,
        id: socket.id
      });
    });
  });

});
