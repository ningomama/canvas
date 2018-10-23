class DrawingCircle extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.firstPoint = true;
        this.endDrawing = false;
        this.points = [];
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
    }

    onMouseDown(coord,event){
    }
    onDragging(coord,event){
        /*
        this.contextDraft.fillStyle = "#f44";
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextDraft.beginPath();
        this.contextDraft.arc((this.origX+coord[0])/2,(this.origY+coord[1])/2,this.getDistinctFromStartPointToEndPoint(this.origX , this.origY,coord)/2,0,2*Math.PI);
        this.contextDraft.stroke();
        */
    }

    onMouseMove(coord){
        this.drawCircle(this.contextDraft,coord);
    }
    onMouseUp(coord){
        if(this.endDrawing){
            if(!isPointInGraphicArea(coord)){
               //var dataURL = this.contextDraft.toDataURL();
               //alert(dataURL);
               graphicArea.enable = false;
               this.drawCircle(this.contextReal , null);
               currentFunction = new DrawingCircle(contextReal,contextDraft);
               currentFunction.onMouseUp(coord);
            }
         }else if(this.firstPoint){
            this.points[0] = [coord[0],coord[1]];
            this.firstPoint = false;
         }else if (!this.firstPoint){
            this.points[1] = [coord[0],coord[1]];
            calculateGraphicAreaSize(this.points);
            this.endDrawing = true;
            graphicArea.enable = true;
         }
        //this.contextReal.arc((this.origX+coord[0])/2,(this.origY+coord[1])/2,this.getDistinctFromStartPointToEndPoint(this.origX , this.origY,coord)/2,0,2*Math.PI);
        //this.contextReal.stroke();
    }
    onMouseLeave(){}
    onMouseEnter(){}

    getDistinctFromStartPointToEndPoint( startX , startY , coord ){
        var XPointDiff = Math.abs(startX - coord[0]);
        XPointDiff *= XPointDiff;
        var YPointDiff = Math.abs(startY - coord[1]);
        YPointDiff *= YPointDiff;
        return Math.sqrt( (XPointDiff+YPointDiff) );
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
            drawTarget.arc( (this.points[0][0] + coord[0] )/2, (this.points[0][1] + coord[1] )/2,
            this.getDistinctFromStartPointToEndPoint(this.points[0][0] , this.points[0][1],coord)/2 
            ,0,2*Math.PI);
        }
        if(this.points.length >= 2){
            drawTarget.arc( (this.points[0][0] + this.points[1][0] )/2, (this.points[0][1] + this.points[1][1] )/2,
            this.getDistinctFromStartPointToEndPoint(this.points[0][0] , this.points[0][1],[this.points[1][0] , this.points[1][1]] )/2
            ,0,2*Math.PI);
        }
        if(this.points.length>0){
            drawTarget.closePath();
            drawTarget.stroke();
            drawTarget.fill();
        }

        /*
        switch(true){
            case (this.points.length>0):
                drawTarget.beginPath();
            case (this.points.length==1):
                alert('wwwww');
                drawTarget.arc( (this.points[0][0] + coord[0] )/2, (this.points[0][1] + coord[1] )/2,
                this.getDistinctFromStartPointToEndPoint(this.points[0][0] , this.points[0][1],coord)/2 
                ,0,2*Math.PI);
            case (this.points.length >= 2):
                if (this.points.length >= 2){
                    drawTarget.arc( (this.points[0][0] + coord[0] )/2, (this.points[0][1] + coord[1] )/2,
                    this.getDistinctFromStartPointToEndPoint(this.points[0][0] , this.points[0][1],[this.points[1][0] , this.points[1][1]] )/2
                    ,0,2*Math.PI);
                }
            case (this.points.length>0):
                drawTarget.closePath();
                drawTarget.stroke();
            default:
        }*/
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

    finishGraphic(){
        this.drawCircle(this.contextReal,null);
    }
    reset(){
        this.firstPoint = true;
        this.endDrawing = false;
        this.points = [];
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
    }
}