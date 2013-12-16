// Canvas related 
var painting = false;
var canvas = $(".canvas");
var context = canvas[0].getContext('2d');
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();

/* We must set the canvas size by attribute, NOT in CSS!*/
canvas.attr("width","400px");
canvas.attr("height","400px");

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
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
  context.drawImage(outlineImage, 0, 0);

  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 3;

  context.beginPath();
  for(var i=0; i < clickX.length; i++) {    
    if(clickDrag[i]){
      context.lineTo(clickX[i], clickY[i]);
    }else{
      context.moveTo(clickX[i], clickY[i]);
    }
  }
  context.stroke();
}

function resourceLoaded() {
  redraw();  
}