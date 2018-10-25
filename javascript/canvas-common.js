let canvasReal = document.getElementById('canvas-real');
let contextReal = canvasReal.getContext('2d');
let canvasDraft = document.getElementById('canvas-draft');
let contextDraft = canvasDraft.getContext('2d');
let currentFunction;
let dragging = false;

// setting the canvas background for undo/redo compatibility
contextReal.fillStyle = '#fff';
contextReal.fillRect(0, 0, contextReal.canvas.width, contextReal.canvas.height);

let previousMousePosition;
//for draw polygon (check the mouse point and the first point click of the polygon, if nearly mouse point , mouse point position = first point )
let sensitivity = 3.5; 
//when the mouse fast move and stay and click but the var (dragging) also true
//will draw a zero length object and will also show edit Drawing Area
//so need to have the min draw length to avoid the bug
let minDrawLength = 3; 

$('#canvas-draft').mousedown(function(e){
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    previousMousePosition = [mouseX,mouseY];
    currentFunction.onMouseDown([mouseX,mouseY],e);
    dragging = true;
});

//need to modify in future
$('#canvas-draft').mousemove(function(e){
   //need to modify??
   
   let mouseX = e.offsetX;
   let mouseY = e.offsetY;
   //clear canvasDraft first and redraw everying later
   contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
   //if end drawing ,graphicArea.enable will set to true in other class function
   if (graphicArea.enable){
      drawGraphicAreaInDraft();
   }
   if(dragging){
       // handle edit Graphic Area and object move if edit Graphic Area is show and mouse point in edit Graphic Area. 
      if (graphicArea.enable && isPointInGraphicArea(previousMousePosition)){
         handleGraphicAreaMove([mouseX,mouseY]);
         currentFunction.handleGraphicMove([mouseX,mouseY]);
      }
      currentFunction.onDragging([mouseX,mouseY],e);
   }
   currentFunction.onMouseMove([mouseX,mouseY],e);
   //save the previousMousePosition.
   previousMousePosition = [mouseX, mouseY];
   
});

//need to modify in furture
$('#canvas-draft').mouseup(function(e){
    
    dragging = false;
    let mouseX = e.offsetX;
    let mouseY = e.offsetY;
    currentFunction.onMouseUp([mouseX,mouseY],e);

    //canvasPush();
});

//need to modify in future
// $('#canvas-draft').mouseup(function(e){
//     /*
//     dragging = false;
//     let mouseX = e.offsetX;
//     let mouseY = e.offsetY;
//     currentFunction.onMouseUp([mouseX,mouseY],e);
//     */
// });

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
// handle the click and double click function
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



$("body").keypress(function(e){
    dragging = false;
    // let mouseX = e.offsetX;
    // let mouseY = e.offsetY;
    let keycode = (e.keyCode ? e.keyCode : e.which);
    if(keycode == '13'){
     currentFunction.onKeyEnter(e);
    }
   
})


class PaintFunction{
    constructor(){
        //will reset and hide edit graphic Area
        graphicArea.reset();
    }
    onMouseDown(){}
    onDragging(){}
    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}
}
