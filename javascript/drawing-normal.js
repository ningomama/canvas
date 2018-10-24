//done?
class DrawingNormal extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;   
        this.contextDraft = contextDraft; 
        this.reset();      
    }
    reset(){
        this.endDrawing = false;
        this.points = [];
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        console.log("reset()");
    }
    finishGraphic(){
        if(this.endDrawing){
            this.draw(this.contextReal,null);
        }
    }

    draw(drawTarget , coord){ 
        if(this.points.length>0){
            //alert('ssss');
            drawTarget.strokeStyle = strokeBrush.color;
            drawTarget.lineWidth = strokeBrush.width;
            drawTarget.beginPath();
            drawTarget.moveTo(this.points[0][0],this.points[0][1]);
            for (let i=0;i<this.points.length-1;i++){
                drawTarget.lineTo(this.points[i][0],this.points[i][1]);
            }
            drawTarget.stroke();
        }
    }

    onMouseDown(coord,event){
        if(!isPointInGraphicArea(coord) && this.endDrawing){
            graphicArea.reset();
            this.finishGraphic();
            currentFunction = new DrawingNormal(contextReal,contextDraft);
            //currentFunction.onMouseUp(coord);
        }
    }
    
    onDragging(coord,event){
        if (!this.endDrawing){
            this.points.push(coord);
        }
    }

    onMouseMove(coord){
        //this.points.push[coord];
        this.draw(contextDraft , coord);
    }
    onMouseUp(coord){
        if(!this.endDrawing){
            //calculateGraphicAreaSize(this.points);
            this.endDrawing = true;
            //graphicArea.enable = true;
        }
        this.onMouseDown(coord,event);
    }
    onDblclick(coord,event){
        if(isPointInGraphicArea(coord)){
            graphicArea.reset();
            this.finishGraphic();
            currentFunction = new DrawingNormal(contextReal,contextDraft);
        }
    }


    onMouseLeave(){}
    onMouseEnter(){}

    onClick(coord,event){

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