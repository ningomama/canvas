class DrawingPolygon extends PaintFunction{
   constructor(contextReal,contextDraft){
       super();
       this.contextReal = contextReal;   
       this.contextDraft = contextDraft;     
       this.firstPoint = true;
       this.endDrawing = false;
       this.paths = [];

       this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
   }
   
    onMouseDown(coord,event){
        
    }
    onDragging(coord,event){
        if(isPointInGraphicArea(previousMousePosition) && this.endDrawing){
            //alert('wwwww');
                //handleGraphicAreaMove(coord);
                //this.handleGraphicMove(coord);

        }
    }
    onMouseMove(coord){
        this.drawPolygon(this.contextDraft , coord);
    }

    onMouseUp(coord){
        if (this.endDrawing){
            if(!isPointInGraphicArea(coord)){
                //var dataURL = this.contextDraft.toDataURL();
                //alert(dataURL);
                graphicArea.enable = false;
                this.drawPolygon(this.contextReal , null);
                currentFunction = new DrawingPolygon(contextReal,contextDraft);
                currentFunction.onMouseUp(coord);
            }
        }else if (this.firstPoint){
            this.origX = coord[0];
            this.origY = coord[1];
            this.firstPoint = false;
            //calculateGraphicAreaSize(this.paths);
            this.paths.push(coord);
        }else{
            if( this.isEndPoint([this.origX , this.origY] , coord) ){
                this.paths.push([this.origX , this.origY]);
                calculateGraphicAreaSize(this.paths);
                //this.drawPolygon(this.contextReal , null);
                graphicArea.enable = true;
                this.endDrawing = true;
            }else{
                calculateGraphicAreaSize(this.paths);
                this.paths.push(coord);
            }
        }

    }
    onMouseLeave(){}
    onMouseEnter(){}

    isEndPoint(startPoint , point){
        //console.log("point[0]"+point[0]);
        //console.log("startPoint[0]"+startPoint[0]);
        //console.log("sensitivity"+sensitivity);
        //if(point[0] == null || startPoint[0]==null)
        //alert('oh');
        if (point[0] < (startPoint[0] +sensitivity) &&  point[0] > (startPoint[0] -sensitivity)){
            if (point[1] < (startPoint[1] +sensitivity) &&  point[1] > (startPoint[1] -sensitivity)){
                return true;
            }
        }
    }

    drawFirstPointSensitivityPointInDraft(){
        this.contextDraft.strokeStyle = "black";
        this.contextDraft.lineJoin = "";
        this.contextDraft.lineWidth = 1;
        this.contextDraft.beginPath();
        this.contextDraft.moveTo(this.origX-sensitivity,this.origY-sensitivity);
        this.contextDraft.lineTo(this.origX+sensitivity,this.origY-sensitivity);
        this.contextDraft.stroke();
        this.contextDraft.lineTo(this.origX+sensitivity,this.origY+sensitivity);
        this.contextDraft.stroke();
        this.contextDraft.lineTo(this.origX-sensitivity,this.origY+sensitivity);
        this.contextDraft.stroke();
        this.contextDraft.lineTo(this.origX-sensitivity,this.origY-sensitivity);
        this.contextDraft.stroke();
        this.contextDraft.closePath();
    }

    drawPolygon(drawTarget , coord){ 
        switch(true){
            case (this.paths.length>0):
                //this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
                if (drawTarget == this.contextDraft && !this.endDrawing){
                    this.drawFirstPointSensitivityPointInDraft();
                }
                drawTarget.strokeStyle = strokeBrush.color;
                drawTarget.lineWidth = strokeBrush.width;
                drawTarget.fillStyle = fillBrush.color;
                drawTarget.lineJoin = "round";
                drawTarget.beginPath();
                drawTarget.moveTo(this.paths[0][0],this.paths[0][1]);
            case (this.paths.length>1):
                for (let s=1 ; s<this.paths.length ;s++){
                    this.drawLine(drawTarget , this.paths[s]);
                }
            case (this.paths.length>0):
                if(drawTarget == this.contextDraft && !this.endDrawing){
                    this.drawLine(drawTarget , coord);
                    //this.drawLine(drawTarget , [this.origX,this.origY]);
                }
                drawTarget.closePath();
                drawTarget.stroke();
            case (this.paths.length>2):
                drawTarget.fill();
                break;
            default:
        }
    }

    drawLine( drawTarget , point){
        //ssss
        if (this.isEndPoint([this.origX , this.origY] , point) ){
            drawTarget.lineTo(this.origX,this.origY);
        }else{
            drawTarget.lineTo(point[0],point[1]);
        }
        //drawTarget.stroke();
    }

    handleGraphicMove(point){
        let xDiff = point[0]-previousMousePosition[0];
        let yDiff = point[1]-previousMousePosition[1];
        console.log("point[0]"+point[0]);
        console.log("previousMousePosition[0]"+previousMousePosition[0]);
        
        this.origX += xDiff;
        this.origY += yDiff;
        for(let i=0 ; i< this.paths.length ;i++){
            this.paths[i][0] += xDiff;
            this.paths[i][1] += yDiff;
        }
    };
    
    
    finishGraphic(){
        this.drawPolygon(this.contextReal,null);
    }
    reset(){
        this.firstPoint = true;
        this.endDrawing = false;
        this.paths = [];
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
    }
}