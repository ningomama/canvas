//done?
class DrawingRectangle extends PaintFunction{
   constructor(contextReal,contextDraft){
      super();
      this.contextReal = contextReal;
      this.contextDraft = contextDraft;
      this.reset();        
   }
   
   finishGraphic(){
       if(this.endDrawing){
        this.drawRectangle(this.contextReal,null);
       }
    }
    reset(){
        this.firstPoint = true;
        this.endDrawing = false;
        this.points = [];
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
    }

    onMouseDown(coord,event){
        //this.contextReal.fillStyle = "#f44";

    }
   onDragging(coord,event){
    if(this.firstPoint){
        this.points[0] = [coord[0],coord[1]];
        this.firstPoint = false;
    }
    if(this.endDrawing && !isPointInGraphicArea(coord)){
        graphicArea.enable = false;
        this.drawRectangle(this.contextReal , null);
        currentFunction = new DrawingRectangle(contextReal,contextDraft);
    }
      /*
       this.contextDraft.fillStyle = "#f44";
       this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
       this.contextDraft.fillRect(this.origX,this.origY,coord[0]- this.origX,coord[1] - this.origY);
       */
   }

   onMouseMove(coord){
      this.drawRectangle(this.contextDraft , coord);
   }

   onMouseUp(coord){
      if(this.endDrawing){
         if(!isPointInGraphicArea(coord)){
            //var dataURL = this.contextDraft.toDataURL();
            //alert(dataURL);
            graphicArea.enable = false;
            this.drawRectangle(this.contextReal , null);
            currentFunction = new DrawingRectangle(contextReal,contextDraft);
            //currentFunction.onMouseUp(coord);
         }
      }else if(this.firstPoint){
         //this.points[0] = [coord[0],coord[1]];
         //this.firstPoint = false;
      }else if (!this.firstPoint && !this.endDrawing){
         this.points[1] = [coord[0],coord[1]];
        if (getDistinctFromStartPointToEndPoint(this.points[0][0] , this.points[0][1], this.points[1])  < minDrawLength){
            this.reset();
        }else{
            calculateGraphicAreaSize(this.points);
            this.endDrawing = true;
            graphicArea.enable = true;
        }
         
      }
      //can store function in array!!!!
      //var funqueue = [];
      //funqueue.push(this.contextReal.fillRect(this.origX,this.origY,coord[0]- this.origX,coord[1] - this.origY));
      //funqueue[0];
   }
   onMouseLeave(){}
   onMouseEnter(){}

    onClick(coord,event){

    }
    onDblclick(coord,event){
        //alert('aaaaaa');
        if(this.endDrawing && isPointInGraphicArea(coord)){
            graphicArea.reset();
            this.drawRectangle(this.contextReal , null);
            currentFunction = new DrawingRectangle(contextReal,contextDraft);
        }
    }

   drawRectangle(drawTarget , coord){ 
    drawTarget.strokeStyle = strokeBrush.color;
    drawTarget.lineWidth = strokeBrush.width;
    drawTarget.fillStyle = fillBrush.color;
      switch(true){
         case (this.points.length==1):
            if (getDistinctFromStartPointToEndPoint(this.points[0][0] , this.points[0][1], coord)  >= minDrawLength){
                drawTarget.fillRect(Math.min(this.points[0][0], coord[0]),Math.min(this.points[0][1], coord[1]),calculateLengthAbsolute(this.points[0][0],coord[0]) ,
                calculateLengthAbsolute(this.points[0][1],coord[1]) );
                drawTarget.strokeRect(Math.min(this.points[0][0], coord[0]),Math.min(this.points[0][1], coord[1]),calculateLengthAbsolute(this.points[0][0],coord[0]) ,
                calculateLengthAbsolute(this.points[0][1],coord[1]) );
            }
            break;
         case (this.points.length==2):
            if (getDistinctFromStartPointToEndPoint(this.points[0][0] , this.points[0][1], this.points[1])  >= minDrawLength){
                drawTarget.fillRect(Math.min(this.points[0][0], this.points[1][0]),Math.min(this.points[0][1], this.points[1][1]),
                calculateLengthAbsolute(this.points[0][0],this.points[1][0]),calculateLengthAbsolute(this.points[0][1],this.points[1][1]));
                drawTarget.strokeRect(Math.min(this.points[0][0], this.points[1][0]),Math.min(this.points[0][1], this.points[1][1]),
                calculateLengthAbsolute(this.points[0][0],this.points[1][0]),calculateLengthAbsolute(this.points[0][1],this.points[1][1]))
            }
            break;
         default:
      }
   }

   handleGraphicMove(point){
      let xDiff = point[0]-previousMousePosition[0];
      let yDiff = point[1]-previousMousePosition[1];
      //console.log("point[0]"+point[0]);
      //console.log("previousMousePosition[0]"+previousMousePosition[0]);
      for(let i=0 ; i< this.points.length ;i++){
          this.points[i][0] += xDiff;
          this.points[i][1] += yDiff;
      }
  };

    
}