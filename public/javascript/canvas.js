var flyWhiteboard = ( function() {

  /* /////////////////
    Private Variables
  */ /////////////////
  // Canvas related
  var painting = false,
      canvas = null,
      context = null,
      strokes = {
        clickX: [-1,-1],
        clickY: [-1,-1],
        type: 'default'
      },
      wrapper =  null,
      wrapper_offset = null;

  // DOM Resources
  var msg = null,
      outlineImage = null;

  /* /////////////////
    Private Functions
  */ /////////////////
  var addClick = function(x, y, dragging){
        if (strokes.clickX[0] === -1){
          strokes.clickX[0] = x;
          strokes.clickX[1] = x;
          strokes.clickY[0] = y;
          strokes.clickY[1] = y;
        }else{
          strokes.clickX[0] = strokes.clickX[1];
          strokes.clickX[1] = x;
          strokes.clickY[0] = strokes.clickY[1];
          strokes.clickY[1] = y;    
        }
        flySocket.click_push(strokes);
      },

      my_draw = function(){
        draw_strokes(strokes);
      },

      reset_strokes = function(){
        painting = false;
        strokes.clickX[0] = -1;
        strokes.clickX[1] = -1;
        strokes.clickY[0] = -1;
        strokes.clickY[1] = -1;
      },

      draw_strokes = function(strokes){
        // stroke型態
        switch_stroke(strokes.type);

        // 只做圖最新兩點即可
        context.beginPath();
        context.lineTo(strokes.clickX[0]-wrapper_offset.left, strokes.clickY[0]-wrapper_offset.top);
        context.lineTo(strokes.clickX[1]-wrapper_offset.left, strokes.clickY[1]-wrapper_offset.top);
        context.stroke();
      },

      switch_stroke = function(type){
        switch(type)
        {
          case 'pencil':
            context.globalCompositeOperation = "source-over";
            context.strokeStyle = "rgba(0,0,0,1)";
            context.lineJoin = "round";
            context.lineWidth = 3;
            break;
          case 'eraser':
            context.globalCompositeOperation = "destination-out";
            context.strokeStyle = "rgba(0,0,0,1)";
            context.lineJoin = "round";
            context.lineWidth = 10;
            break;
          default:
            context.globalCompositeOperation = "source-over";
            context.strokeStyle = "rgba(0,0,0,1)";
            context.lineJoin = "round";
            context.lineWidth = 3;
        }
      };


  /* /////////////////
    Public Functions
  */ /////////////////
  return {    

    pulled_strokes: function(data){
      draw_strokes(data);
    },    

    clear_canvas: function(){
      // Clears the canvas
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    },

    init: function(host){
      console.log('flyWhiteboard: init');

      canvas = $(".canvas");
      context = canvas[0].getContext('2d');
      wrapper = $(".wrapper");
      wrapper_offset = wrapper.position();
      msg = $(".msg");

      // Create soket connection, with localtest=true
      flySocket.init(host,this,true);

      /* 
        We must set the canvas size by attribute, NOT in CSS!
      */
      canvas.attr("width",wrapper.css('width')+"px");
      canvas.attr("height",wrapper.css('height')+"px");

      canvas.mousedown(function(e){
        var mouseX = e.pageX - this.offsetLeft,
            mouseY = e.pageY - this.offsetTop;
          
        painting = true;
        addClick(mouseX, mouseY, false);
        my_draw();
      });

      canvas.mousemove(function(e){
        var mouseX = e.pageX - this.offsetLeft,
            mouseY = e.pageY - this.offsetTop;

        if(painting){
          addClick(mouseX, mouseY, true);
          my_draw();
        }
      });

      canvas.mouseup(function(e){
        reset_strokes();
      });

      canvas.mouseleave(function(e){
        reset_strokes();
      });

      $('.toolbar').on('click','button',function(){
        var btn = $(this).attr('class');
        
        if(btn === 'btn_eraser' || btn === 'btn_pencil'){
          strokes.type = btn.replace('btn_','');
          msg.html('<p> switch to: ' + btn.replace('btn_','') + '</p>');
        }else if (btn === 'btn_clear'){
          flySocket.clear_push();
        }else{

        }
      });

      $('.classrooms').on('click','button',function(){
        var room = parseInt($(this).attr('room'));

        flySocket.switch_classroom(room);

        $('.this-classroom').html('You are in classroom '+room);
      });
    }
  };

}());