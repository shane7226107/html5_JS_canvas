var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    // users = [],
    classrooms = [[],[]];

server.listen(3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('*', function (req, res) {
  res.sendfile(__dirname + '/public/'+req.params[0]);
});

io.sockets.on('connection', function (socket) {
  var user_in_classroom = 0;
  // Push users into the "classroom"
  // users.push(socket);
  classrooms[user_in_classroom].push(socket);

  socket.emit('registration', socket.id);

  socket.on('click_push', function (data) {
    // broadcast to all users
    for (var u in classrooms[user_in_classroom]) {
      classrooms[user_in_classroom][u].emit('click_pull', {
        data: data,
        id: classrooms[user_in_classroom][u].id
      });
    } 
  });

  socket.on('clear_push', function (data) {
    // broadcast to all users
    for (var u in classrooms[user_in_classroom]) {
      classrooms[user_in_classroom][u].emit('clear_pull',{
        id: classrooms[user_in_classroom][u].id
      });
    } 
  });

  socket.on('switch_classroom', function (to_classroom) {
    var index = arrayObjectIndexOf(classrooms[user_in_classroom], this.id, 'id');

    classrooms[user_in_classroom].splice(index,1);
    classrooms[to_classroom].push(this);

    user_in_classroom = to_classroom;

    // console.log("\n\n====\nroom1:\n");
    // for (var u in classrooms[0]) {
    //   console.log(u);
    // }
    // console.log("====\nroom2:\n");
    // for (var u in classrooms[1]) {
    //   console.log(u);
    // }
  });
});

function arrayObjectIndexOf(myArray, searchTerm, property) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}

