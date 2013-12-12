var msg = $(".msg");
var letsdraw = false;
var canvas = $(".canvas");
var canvas_context = canvas[0].getContext('2d');
var canvasOffset = canvas.offset();

/* We must set the canvas size by attribute, NOT in CSS!*/
canvas.attr("width","400px");
canvas.attr("height","400px");

canvas.mousemove(function(e) {
  var cursor_x = e.pageX - canvasOffset.left,
      cursor_y = e.pageY - canvasOffset.top;

    if (letsdraw === true) {
        canvas_context.lineTo(cursor_x, cursor_y);
        canvas_context.stroke();
        // msg.append("<br>x: "+cursor_x+" y: "+cursor_y);
    }
});

canvas.mousedown(function(e) {
  var cursor_x = e.pageX - canvasOffset.left,
      cursor_y = e.pageY - canvasOffset.top;

  letsdraw = true;
  canvas_context.strokeStyle = 'blue';
  canvas_context.lineWidth = 1;
  canvas_context.lineCap = 'round';
  canvas_context.beginPath();

  canvas_context.moveTo(cursor_x, cursor_y);
});

$(window).mouseup(function() {
    letsdraw = false;
});