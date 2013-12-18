var flySocket = {

  socket: null,
  socket_id: null,

  init: function(host,whiteboard,LOCAL_TEST){

    socket = io.connect(host);

    /* ////////////////////////////////
      Server to client
    */ ////////////////////////////////

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
        whiteboard.pulled_strokes(data.data);
      }  
    });

    // server廣播某使用者的clear動作
    socket.on('clear_pull', function (data) {
      // 跳過自己畫的strokes,只畫其他user的strokes
      // 因為localhost屬於同一個session,所以看不出效果
      if(!(data.id === socket_id) || LOCAL_TEST){
        whiteboard.clear_canvas();
      }  
    });

  },

  /* ////////////////////////////////
    Client to Server
  */ ////////////////////////////////  
  // 使用者新增畫筆動作
  click_push: function(strokes){
    socket.emit('click_push',strokes);
  },

  // 使用者按下clear
  clear_push: function(){
    socket.emit('clear_push');
  },

  // 使用者切換教室
  switch_classroom: function(room){
    socket.emit('switch_classroom',room);
  }

};