class Fill extends PaintFunction{
    constructor(contextReal){
        super();
        this.ctx = contextReal;
        let coordinates = [];
        for (let i = 0; i < h; i++) {
            coordinates[i] = [];
        }
        let img = contextReal.getImageData(0, 0, ctx.width, ctx.height);
    }

    onMouseDown(coord, event){     
    }

    onDragging(coord,event){
    }

    onMouseMove(){}
    onMouseUp(){}
    onMouseLeave(){}
    onMouseEnter(){}

    onDblclick(coord,event){
    }

    onClick(coord,event){
        
        canvasPush();
    }
}