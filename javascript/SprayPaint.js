class SprayPaint extends PaintFunction{
    constructor(contextReal){
        super();
        this.ctx = contextReal;
    }

    onMouseDown(coord, event){
        this.endDrawing = false;
        this.ctx.fillStyle = strokeBrush.color;
        let w = this.ctx.lineWidth = strokeBrush.width;
        this.ctx.beginPath();
        this.ctx.moveTo(coord[0],coord[1]);
        this.spray(coord[0],coord[1],w);    
    }

    onDragging(coord,event){
        let w = this.ctx.lineWidth = strokeBrush.width;
        this.spray(coord[0],coord[1],w);
    }

    onMouseMove(){}
    onMouseUp(){
        this.endDrawing = true;
        canvasPush();
    }
    onMouseLeave(){
        if (!this.endDrawing) {
            this.endDrawing = true;
            canvasPush();
        }
    }
    onMouseEnter(){}

    onDblclick(coord,event){
    }

    onClick(coord,event){

    }

    getRandomOffset(radius) {
        var random_angle = Math.random() * (2*Math.PI);
        var random_radius = Math.random() * radius;
             
        return {
            x: Math.cos(random_angle) * random_radius,
            y: Math.sin(random_angle) * random_radius
        };
    };
    
    spray(x,y,w) {

        var density = 50;
         
        for (var i = 0; i < density; i++) {
            var offset = this.getRandomOffset(w);
            x = x + offset.x;
            y = y + offset.y;
            this.ctx.fillRect(x, y, 1, 1);
        }
    };
    

    reset(){
        this.endDrawing = false;
        this.points = [];
        this.ctx.clearRect(0,0,canvasDraft.width,canvasDraft.height);
    }
}