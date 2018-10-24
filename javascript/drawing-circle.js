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
        this.points = [];
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
    }
    finishGraphic(){
        if(this.endDrawing){
            this.drawCircle(this.contextReal,null);
        }
    }
    
    onDblclick(coord,event){
        if(this.endDrawing && isPointInGraphicArea(coord)){
            graphicArea.reset();
            this.drawCircle(this.contextReal , null);
            currentFunction = new DrawingCircle(contextReal,contextDraft);
        }
    }



    drawCircle(drawTarget , coord){ 
        drawTarget.strokeStyle = strokeBrush.color;
        drawTarget.lineWidth = strokeBrush.width;
        drawTarget.fillStyle = fillBrush.color;
        drawTarget.globalAlpha = strokeBrush.opacity;

        if(this.points.length>0){
            drawTarget.beginPath();
        }
        if(this.points.length==1){
            //alert('wwwww');
            if (getDistinctFromStartPointToEndPoint(this.points[0][0] , this.points[0][1],coord)  >= minDrawLength)
            drawTarget.arc( (this.points[0][0] + coord[0] )/2, (this.points[0][1] + coord[1] )/2,
            getDistinctFromStartPointToEndPoint(this.points[0][0] , this.points[0][1],coord)/2 
            ,0,2*Math.PI);
        }
        if(this.points.length == 2){
            if (getDistinctFromStartPointToEndPoint(this.points[0][0] , this.points[0][1],[this.points[1][0] , this.points[1][1]])  >= minDrawLength)
            drawTarget.arc( (this.points[0][0] + this.points[1][0] )/2, (this.points[0][1] + this.points[1][1] )/2,
            getDistinctFromStartPointToEndPoint(this.points[0][0] , this.points[0][1],[this.points[1][0] , this.points[1][1]] )/2
            ,0,2*Math.PI);
        }
        if(this.points.length>0){
            drawTarget.closePath();
            drawTarget.stroke();
            drawTarget.fill();
        }
    }


    onDragging(coord,event){
        if (this.firstPoint){
            this.points[0] = [coord[0],coord[1]];
            this.firstPoint = false;
        }
        //console.log('onDragging');
    }

    onMouseMove(coord){
        console.log('onDragging');
        this.drawCircle(this.contextDraft,coord);
    }
    onMouseUp(coord){
        if (!this.firstPoint && !this.endDrawing){
            this.points[1] = [coord[0],coord[1]];
            // important
            if (getDistinctFromStartPointToEndPoint(this.points[0][0] , this.points[0][1],[this.points[1][0] , this.points[1][1]])  < minDrawLength){
                //this.finishGraphic(); 
                this.reset();
            }else{
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
        if(this.endDrawing){
            if(!isPointInGraphicArea(coord)){
                //var dataURL = this.contextDraft.toDataURL();
                //alert(dataURL);
                graphicArea.enable = false;
                this.drawCircle(this.contextReal , null);
                currentFunction = new DrawingCircle(contextReal,contextDraft);
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