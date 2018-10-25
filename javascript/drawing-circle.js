//done?
class DrawingCircle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.reset();
    }
    reset(){
        this.firstPoint = true;
        this.endDrawing = false;
        // all user click will store in array
        this.points = [];
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
    }
    //drawing the circle to the real canvas if the drawing is finish
    finishGraphic(){
        if(this.endDrawing){
            this.drawCircle(this.contextReal,null);
        }
    }
    
    onDblclick(coord,event){
        //if finish drawing and double click in edit GraphicArea
        //1.reset and hide the edit graphic Area and draw the graphic to real canvas if in the edit graphic Area and 
        //2.draw the graphic to real canvas
        //3.push canvasPush
        if(this.endDrawing && isPointInGraphicArea(coord)){
            graphicArea.reset();
            currentFunction.drawCircle(this.contextReal , null);
            currentFunction = new DrawingCircle(contextReal,contextDraft);
            canvasPush();
        }
    }


    
    drawCircle(drawTarget , coord){ 
        //setting
        drawTarget.strokeStyle = strokeBrush.color;
        drawTarget.lineWidth = strokeBrush.width;
        drawTarget.fillStyle = fillBrush.color;
        drawTarget.globalAlpha = strokeBrush.opacity;

        if(this.points.length>0){
            //start
            drawTarget.beginPath();
        }
        // if only click first point 
        if(this.points.length==1){
            // check if the the first click point and mouse point is >= minDrawLength , draw if yes
            if (getDistinctFromStartPointToEndPoint(this.points[0][0] , this.points[0][1],coord)  >= minDrawLength)
            drawTarget.arc( (this.points[0][0] + coord[0] )/2, (this.points[0][1] + coord[1] )/2,
            getDistinctFromStartPointToEndPoint(this.points[0][0] , this.points[0][1],coord)/2 
            ,0,2*Math.PI);
        }
        // if click two points
        if(this.points.length == 2){
            // check if the the two click point length is >= minDrawLength , draw if yes
            if (getDistinctFromStartPointToEndPoint(this.points[0][0] , this.points[0][1],[this.points[1][0] , this.points[1][1]])  >= minDrawLength)
            drawTarget.arc( (this.points[0][0] + this.points[1][0] )/2, (this.points[0][1] + this.points[1][1] )/2,
            getDistinctFromStartPointToEndPoint(this.points[0][0] , this.points[0][1],[this.points[1][0] , this.points[1][1]] )/2
            ,0,2*Math.PI);
        }
        if(this.points.length>0){
            //end the circle
            drawTarget.closePath();
            drawTarget.stroke();
            drawTarget.fill();
        }
    }


    onDragging(coord,event){
        //will set the first click point if click the first point
        if (this.firstPoint){
            this.points[0] = [coord[0],coord[1]];
            this.firstPoint = false;
        }
    }

    onMouseMove(coord){
        //console.log('onDragging');
        // draw the circle in every MouseMove
        this.drawCircle(this.contextDraft,coord);
    }
    onMouseUp(coord){
        //when dragging before and drawing is not end before
        if (!this.firstPoint && !this.endDrawing){
            //if user draw a too small circle {
            //  reset the setting (cancle user input) 
            //}else{
            //  calculateGraphicAreaSize() and show graphicArea   
            //}
            if (getDistinctFromStartPointToEndPoint(this.points[0][0] , this.points[0][1],coord)  < minDrawLength){
                this.reset();
            }else{
                this.points[1] = [coord[0],coord[1]];
                calculateGraphicAreaSize(this.points);
                this.endDrawing = true;
                graphicArea.enable = true;
            }
        }
    }
    onMouseLeave(){}
    onMouseEnter(){}
    onClick(coord,event){

    }
    onMouseDown(coord,event){
        // if already draw a clicle and mouse is not in edit Graphic Area,
        // hide edit graphic Area
        // draw circle to real canvas and new DrawingCircle
        // save canvas
        if(this.endDrawing){
            if(!isPointInGraphicArea(coord)){
                graphicArea.enable = false;
                this.drawCircle(this.contextReal , null);
                currentFunction = new DrawingCircle(contextReal,contextDraft);
                canvasPush();
                //currentFunction.onMouseUp(coord);
            }
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