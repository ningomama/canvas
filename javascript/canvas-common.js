let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let currentFunction;
let dragging = false;

let previousMousePosition;
let sensitivity = 3.5;
let minDrawLength = 3;

$('#canvas-draft').mousedown(function(e){
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    previousMousePosition = [mouseX,mouseY];
    currentFunction.onMouseDown([mouseX,mouseY],e);
    dragging = true;
});

//need to modify in furture
$('#canvas-draft').mousemove(function(e){
   //need to modify??
   /*
   let mouseX = e.offsetX;
   let mouseY = e.offsetY;
   contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
   if (graphicArea.enable){
      drawGraphicAreaInDraft();
   }
   if(dragging){
      if (graphicArea.enable && isPointInGraphicArea(previousMousePosition)){
         handleGraphicAreaMove([mouseX,mouseY]);
         currentFunction.handleGraphicMove([mouseX,mouseY]);
      }
      currentFunction.onDragging([mouseX,mouseY],e);
   }
   currentFunction.onMouseMove([mouseX,mouseY],e);
   previousMousePosition = [mouseX, mouseY];
   */
});

$('body').mousemove(function(e){
    var rect = e.target.getBoundingClientRect();
    /*
    $("#myTable").position().top;
    
    (e.clientX - $("#canvas-real").position().left<0)? x=0
    (e.clientX - $("#canvas-real").position().left>canvasReal.width)? x=canvasReal.width
    (e.clientY - $("#canvas-real").position().top<0)? y=0
    (e.clientY - $("#canvas-real").position().top>canvasReal.height)? y=canvasReal.height
    */

    let mouseX = e.clientX - $("#canvas-real").position().left;
    mouseX = (mouseX <0) ? 0 : ((mouseX >canvasReal.width) ? canvasReal.width : mouseX );
    let mouseY = e.clientY - $("#canvas-real").position().top;
    mouseY = (mouseY <0) ? 0 : ((mouseY >canvasReal.height) ? canvasReal.height : mouseY );


    contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
    if (graphicArea.enable){
        drawGraphicAreaInDraft();
    }
    if(dragging){
        if (graphicArea.enable && isPointInGraphicArea(previousMousePosition)){
            currentFunction.handleGraphicMove([mouseX,mouseY]);
            handleGraphicAreaMove([mouseX,mouseY]);
        }
        currentFunction.onDragging([mouseX,mouseY],e);
    }
    currentFunction.onMouseMove([mouseX,mouseY],e);
    previousMousePosition = [mouseX, mouseY];

    //console.log("body mouse move"+e.clientX+'    '+e.clientY);
});

$('body').mouseup(function(e){
    dragging = false;

    var rect = e.target.getBoundingClientRect();

    let mouseX = e.clientX - $("#canvas-real").position().left;
    mouseX = (mouseX <0) ? 0 : ((mouseX >canvasReal.width) ? canvasReal.width : mouseX );
    let mouseY = e.clientY - $("#canvas-real").position().top;
    mouseY = (mouseY <0) ? 0 : ((mouseY >canvasReal.height) ? canvasReal.height : mouseY );

    currentFunction.onMouseUp([mouseX,mouseY],e);
});

//need to modify in furture
$('#canvas-draft').mouseup(function(e){
    /*
    dragging = false;
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseUp([mouseX,mouseY],e);
    */
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

var timer = 0;
var delay = 200;
var prevent = false;

$("#canvas-draft")
.on("click", function(e) {
   timer = setTimeout(function() {
   if (!prevent) {
      let mouseX = e.offsetX;
      let mouseY = e.offsetY;
      currentFunction.onClick([mouseX,mouseY],this.e);
   }
   prevent = false;
   }, delay);
})
.on("dblclick", function(e) {
   clearTimeout(timer);
   prevent = true;
   let mouseX = e.offsetX;
   let mouseY = e.offsetY;
   currentFunction.onDblclick([mouseX,mouseY],this.e);
}); 


class PaintFunction{
   constructor(){
      graphicArea.reset();
   }
   onMouseDown(){}
   onDragging(){}
   onMouseMove(){}
   onMouseUp(){}
   onMouseLeave(){}
   onMouseEnter(){}
}
