// Canvas related 
var painting = false;
var canvas = $(".canvas");
var context = canvas[0].getContext('2d');
var strokes = {
      clickX: [-1,-1],
      clickY: [-1,-1]
    };
var wrapper = $(".wrapper");
var wrapper_offset = wrapper.position();

/* We must set the canvas size by attribute, NOT in CSS!*/
canvas.attr("width",wrapper.css('width')+"px");
canvas.attr("height",wrapper.css('height')+"px");
context.lineJoin = "round";
context.lineWidth = 3;

// Resources
var outlineImage = new Image();
outlineImage.onload = resourceLoaded;
outlineImage.src = "images/geometry.jpg";

// Misc
var msg = $(".msg");

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

function reset_strokes(){
  painting = false;
  strokes.clickX[0] = -1;
  strokes.clickX[1] = -1;
  strokes.clickY[0] = -1;
  strokes.clickY[1] = -1;
}

function addClick(x, y, dragging)
{ 
  
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
  click_push();
}

function my_draw(){
  // context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
  // context.drawImage(outlineImage, 0, 0);

  context.strokeStyle = "#df4b26";

  draw_strokes(strokes);
}

function resourceLoaded() {
  my_draw();  
}

function pulled_strokes(data){

  context.strokeStyle = "black"; 

  draw_strokes(data);
}

function draw_strokes(strokes){

  // 效果不佳 會斷續
  // for(var i=0; i < strokes.clickX.length; i++) {
  //   if(strokes.clickDrag[i]){
  //     context.fillRect(strokes.clickX[i]-wrapper_offset.left, strokes.clickY[i]-wrapper_offset.top,8,8);
  //   }
  // }

  // 只做圖最新兩點即可
  context.beginPath();
  context.lineTo(strokes.clickX[0]-wrapper_offset.left, strokes.clickY[0]-wrapper_offset.top);
  context.lineTo(strokes.clickX[1]-wrapper_offset.left, strokes.clickY[1]-wrapper_offset.top);
  context.stroke();
}