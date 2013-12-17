// Canvas related 
var painting = false;
var canvas = $(".canvas");
var context = canvas[0].getContext('2d');
var strokes = {
      clickX: [],
      clickY: [],
      clickDrag: []
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
  redraw();
});

canvas.mousemove(function(e){
  var mouseX = e.pageX - this.offsetLeft,
      mouseY = e.pageY - this.offsetTop;

  if(painting){
    addClick(mouseX, mouseY, true);
    redraw();
  }
});

canvas.mouseup(function(e){
  painting = false;
});

canvas.mouseleave(function(e){
  painting = false;
});

function addClick(x, y, dragging)
{
  strokes.clickX.push(x);
  strokes.clickY.push(y);
  strokes.clickDrag.push(dragging);  
  click_push();
}

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
  // context.drawImage(outlineImage, 0, 0);

  context.strokeStyle = "#df4b26";

  draw_strokes(strokes);
}

function resourceLoaded() {
  redraw();  
}

function pulled_strokes(data){

  context.strokeStyle = "black"; 

  draw_strokes(data);
}

function draw_strokes(strokes){

  context.beginPath();
  
  for(var i=0; i < strokes.clickX.length; i++) {    
    if(strokes.clickDrag[i]){
      context.lineTo(strokes.clickX[i]-wrapper_offset.left, strokes.clickY[i]-wrapper_offset.top);
    }else{
      context.moveTo(strokes.clickX[i]-wrapper_offset.left, strokes.clickY[i]-wrapper_offset.top);
    }
  }

  context.stroke();
}