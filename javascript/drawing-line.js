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
        if(!isPointInGraphicArea(coord) && this.endDrawing){
            graphicArea.enable = false;
            // need
            this.drawLine(this.contextReal , null);
            currentFunction = new DrawingLine(contextReal,contextDraft);
            canvasPush();
            //currentFunction.onMouseUp(coord);
        }
    }
    onDragging(coord,event){
        if(this.firstPoint){
            this.points[0] = [coord[0],coord[1]];
            this.firstPoint = false;
        }
    }

    onMouseMove(coord){
        this.drawLine(this.contextDraft,coord);
    }
    onMouseUp(coord){
        if (!this.firstPoint && !this.endDrawing){
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
        if(this.endDrawing && isPointInGraphicArea(coord)){
            graphicArea.enable = false;
            this.drawLine(this.contextReal , null);
            currentFunction = new DrawingLine(contextReal,contextDraft);
            canvasPush();
        }
    }

    drawLine(drawTarget , coord){ 
        drawTarget.strokeStyle = strokeBrush.color;
        drawTarget.lineWidth = strokeBrush.width;

        if(this.points.length>0){
            drawTarget.beginPath();
        }
        if(this.points.length==1){
            if (getDistinctFromStartPointToEndPoint( this.points[0][0],this.points[0][1], coord) >= minDrawLength ){
                drawTarget.moveTo(this.points[0][0],this.points[0][1]);
                drawTarget.lineTo(coord[0],coord[1]);
            }
        }
        if(this.points.length >= 2){
            if (getDistinctFromStartPointToEndPoint( this.points[0][0],this.points[0][1], this.points[1]) >= minDrawLength){
                drawTarget.moveTo(this.points[0][0],this.points[0][1]);
                drawTarget.lineTo(this.points[1][0],this.points[1][1]);
            }
        }
        if(this.points.length>0){
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