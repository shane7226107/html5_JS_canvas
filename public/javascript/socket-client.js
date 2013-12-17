var socket = io.connect('http://localhost:3000'),
    socket_id = null,
    LOCAL_TEST = true; //畫出來自同session的stroke

// 將從server註冊的sessionID存在client端
socket.on('registration', function (data) {
  socket_id = data;
});

// server廣播某使用者的strokes
socket.on('click_pull', function (data) {
  // console.log("socket_id:"+socket_id+"  data.id:"+data.id);

  // 跳過自己畫的strokes,只畫其他user的strokes
  // 因為localhost屬於同一個session,所以看不出效果
  if(!(data.id === socket_id) || LOCAL_TEST){
    pulled_strokes(data.data);
  }  
});

// server廣播某使用者的clear動作
socket.on('clear_pull', function (data) {
  // 跳過自己畫的strokes,只畫其他user的strokes
  // 因為localhost屬於同一個session,所以看不出效果
  if(!(data.id === socket_id) || LOCAL_TEST){
    clear_canvas();
  }  
});

// 使用者新增畫筆動作時,將動作push上server
function click_push(strokes){
  socket.emit('click_push',strokes);
}

// 使用者按下clear時,將動作push上server
function clear_push(){
  socket.emit('clear_push');
}