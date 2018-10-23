class DrawingLine extends PaintFunction{
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

    }

    onMouseMove(coord){
        this.drawLine(this.contextDraft,coord);
    }
    onMouseUp(coord){
        if(this.endDrawing){
            if(!isPointInGraphicArea(coord)){
                //var dataURL = this.contextDraft.toDataURL();
                //alert(dataURL);
                graphicArea.enable = false;
                this.drawLine(this.contextReal , null);
                currentFunction = new DrawingLine(contextReal,contextDraft);
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
    }
    onMouseLeave(){}
    onMouseEnter(){}

    drawLine(drawTarget , coord){ 
        drawTarget.strokeStyle = strokeBrush.color;
        drawTarget.lineWidth = strokeBrush.width;

        if(this.points.length>0){
            drawTarget.beginPath();
        }
        if(this.points.length==1){
            drawTarget.moveTo(this.points[0][0],this.points[0][1]);
            drawTarget.lineTo(coord[0],coord[1]);
        }
        if(this.points.length >= 2){
            drawTarget.moveTo(this.points[0][0],this.points[0][1]);
            drawTarget.lineTo(this.points[1][0],this.points[1][1]);
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
    finishGraphic(){
        this.drawLine(this.contextReal,null);
    }
    reset(){
        this.firstPoint = true;
        this.endDrawing = false;
        this.points = [];
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
    }
}