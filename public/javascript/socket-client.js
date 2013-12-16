var socket = io.connect('http://192.168.2.38:3000'),
    socket_id = null,
    LOCAL_TEST = true;

socket.on('registration', function (data) {
  socket_id = data;
});

socket.on('click_pull', function (data) {
  // console.log("socket_id:"+socket_id+"  data.id:"+data.id);

  // 跳過自己畫的strokes,只多畫其他sessions的strokes
  // 因為localhost屬於同一個session,所以看不出效果
  if(!(data.id === socket_id) || LOCAL_TEST){
    pulled_strokes(data.data);  
  }  
});

function click_push(){
  socket.emit('click_push', 
    { 
      clickX:clickX,
      clickY:clickY,
      clickDrag:clickDrag
    }
  );
}