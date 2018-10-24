
class Wipe extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;   
        this.contextDraft = contextDraft; 
        //this.reset();      
    }
    reset(){
        
    }
    finishGraphic(){
    }

    draw(drawTarget , coord){ 
        drawTarget.clearRect(previousMousePosition[0],previousMousePosition[1],10,10);
    }

    onMouseDown(coord,event){
    }
    onDragging(coord,event){
        this.draw(this.contextReal,coord);
    }

    onMouseMove(coord){
    }
    onMouseUp(coord){
    }
    onDblclick(coord,event){
    }


    onMouseLeave(){}
    onMouseEnter(){}

    onClick(coord,event){

    }

    handleGraphicMove(point){
    };

    

}