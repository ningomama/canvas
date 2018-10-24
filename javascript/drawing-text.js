class DrawingText extends PaintFunction{
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
        this.contextReal.fillStyle = "#f44";
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord,event){
        this.contextDraft.fillStyle = "#f44";
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);

        this.contextDraft.font = "30px Arial";
        this.contextDraft.fillText("Hello World",200,50);
        //this.contextDraft.fillRect(this.origX,this.origY,coord[0]- this.origX,coord[1] - this.origY)
    }

    onMouseMove(){}
    onMouseUp(coord){
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
        this.contextReal.font = "30px Arial";
        this.contextReal.fillText("Hello World",10,50);
        //ctx.strokeText("Hello World",10,50);
    }
    onMouseLeave(){}
    onMouseEnter(){}

    onClick(coord,event){

    }
    onDblclick(coord,event){

    }

    finishGraphic(){
        //this.drawLine(this.contextReal,null);
    }
    reset(){
        this.firstPoint = true;
        this.endDrawing = false;
        this.points = [];
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);
    }
}