//done?
class DrawingLine extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;   
        this.contextDraft = contextDraft;     
        this.reset(); 
    }
    finishGraphic(){
        this.drawLine(this.contextReal,null);
    }
    reset(){
        this.firstPoint = true;
        this.endDrawing = false;
        this.points = [];
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
    }

    onMouseDown(coord,event){
        //need to be bug fix (not push!!!!!!)
        // if already draw a line and mouse is not in edit Graphic Area,
        // hide edit graphic Area
        // draw line to real canvas and new DrawingLine
        // save canvas
        if(!isPointInGraphicArea(coord) && this.endDrawing){
            graphicArea.enable = false;
            this.drawLine(this.contextReal , null);
            currentFunction = new DrawingLine(contextReal,contextDraft);
            canvasPush();
            //currentFunction.onMouseUp(coord);
        }
    }
    onDragging(coord,event){
        //will set the first click point if click the first point
        if(this.firstPoint){
            this.points[0] = [coord[0],coord[1]];
            this.firstPoint = false;
        }
    }

    onMouseMove(coord){
        // draw the line in every MouseMove
        this.drawLine(this.contextDraft,coord);
    }
    onMouseUp(coord){
        //when dragging before and drawing is not end before
        if (!this.firstPoint && !this.endDrawing){
            //if user draw a too small circle {
            //  reset the setting (cancle user input) 
            //}else{
            //  calculateGraphicAreaSize() and show graphicArea   
            //}
            if (getDistinctFromStartPointToEndPoint(this.points[0][0] , this.points[0][1], coord)  < minDrawLength){
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
    onDblclick(coord,event){
        //if finish drawing and double click in edit GraphicArea
        //1.reset and hide the edit graphic Area and draw the graphic to real canvas if in the edit graphic Area and 
        //2.draw the graphic to real canvas
        //3.push canvasPush
        if(this.endDrawing && isPointInGraphicArea(coord)){
            graphicArea.enable = false;
            this.drawLine(this.contextReal , null);
            currentFunction = new DrawingLine(contextReal,contextDraft);
            canvasPush();
        }
    }

    drawLine(drawTarget , coord){ 
        //setting
        drawTarget.strokeStyle = strokeBrush.color;
        drawTarget.lineWidth = strokeBrush.width;

        if(this.points.length>0){
            //start
            drawTarget.beginPath();
        }
        // if only click first point
        if(this.points.length==1){
            // check if the the first click point and mouse point is >= minDrawLength , draw if yes
            if (getDistinctFromStartPointToEndPoint( this.points[0][0],this.points[0][1], coord) >= minDrawLength ){
                drawTarget.moveTo(this.points[0][0],this.points[0][1]);
                drawTarget.lineTo(coord[0],coord[1]);
            }
        }
        // if click two points
        if(this.points.length >= 2){
            // check if the the two click point length is >= minDrawLength , draw if yes
            if (getDistinctFromStartPointToEndPoint( this.points[0][0],this.points[0][1], this.points[1]) >= minDrawLength){
                drawTarget.moveTo(this.points[0][0],this.points[0][1]);
                drawTarget.lineTo(this.points[1][0],this.points[1][1]);
            }
        }
        if(this.points.length>0){
            //end the line
            drawTarget.closePath();
            drawTarget.stroke();
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