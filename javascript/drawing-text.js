class DrawingText extends PaintFunction{
    constructor(contextReal,contextDraft){
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.firstPoint = true;
        this.endDrawing = false;
        this.points = [];
        this.i = 1;
        this.contextDraft.clearRect(0,0,canvasDraft.width,canvasDraft.height);        
    }

    onMouseDown(coord,event){
        this.origX = coord[0]
        this.origY = coord[1]
        
        this.boxTop = this.origY + 50;
        this.boxLeft = this.origX + 50;
      
        this.color = strokeBrush.color;
        this.fontsize = strokeBrush.width + "px";


        if(this.endDrawing || this.firstPoint){ 
        $(`<input title="hit ENTER to confirm" name="textbox" class="textbox" id=${this.i} type="textarea" placeholder="TYPE HERE">`).insertAfter("#canvas-draft"); $('#' + this.i).css({fontSize: this.fontsize, color:this.color, visibility:"visible", position:"fixed", top: this.boxTop, left: this.boxLeft});
        this.i ++; 
        this.endDrawing = false;
        }
        console.log(this.firstPoint)
    }
    onDragging(){
        
    }

    onMouseMove(){}
    onMouseUp(){
        this.firstPoint=false;
        console.log(this.firstPoint)
    }
    onMouseLeave(){}
    onMouseEnter(){}

    onClick(coord,event){
    }
    onDblclick(coord,event){
    }

    
    onKeyEnter(event){
        
        let textCount = this.i -1;
        let textInput = $('#'+ textCount).val();
        this.contextReal.fillStyle = this.color;
        this.contextReal.font = `${this.fontsize} Arial`;
        this.contextReal.fillText(textInput,this.origX,this.origY);
        $('#'+ textCount).css({visibility:"hidden", position:"fixed", top: 0, left: 0});
        this.endDrawing=true;
        canvasPush();
    };


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