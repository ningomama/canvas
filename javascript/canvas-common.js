let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let currentFunction;
let dragging = false;

let previousMousePosition;
let sensitivity = 3.5;

$('#canvas-draft').mousedown(function(e){
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    previousMousePosition = [mouseX,mouseY];
    currentFunction.onMouseDown([mouseX,mouseY],e);
    dragging = true;
});

$('#canvas-draft').mousemove(function(e){
   let mouseX = e.offsetX;
   let mouseY = e.offsetY;
   contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
   if(dragging){
      if (graphicArea.enable && isPointInGraphicArea(previousMousePosition)){
         handleGraphicAreaMove([mouseX,mouseY]);
         currentFunction.handleGraphicMove([mouseX,mouseY]);
      }
      currentFunction.onDragging([mouseX,mouseY],e);
   }
   currentFunction.onMouseMove([mouseX,mouseY],e);
   if (graphicArea.enable){
      drawGraphicAreaInDraft();
   }
   previousMousePosition = [mouseX, mouseY];
});

$('#canvas-draft').mouseup(function(e){
    dragging = false;
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseUp([mouseX,mouseY],e);
});

$('#canvas-draft').mouseleave(function(e){
    dragging = false;
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseLeave([mouseX,mouseY],e);
});

$('#canvas-draft').mouseenter(function(e){
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseEnter([mouseX,mouseY],e);
});

class PaintFunction{
   constructor(){
      graphicArea.reset();
      graphicArea.enable = false;
   }
   onMouseDown(){}
   onDragging(){}
   onMouseMove(){}
   onMouseUp(){}
   onMouseLeave(){}
   onMouseEnter(){}
}
