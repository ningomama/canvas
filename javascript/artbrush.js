class ArtBrush extends PaintFunction{
    constructor(contextReal, density, thickness, rad){
        super();
        this.ctx = contextReal;
        this.density = density;
        this.thickness = thickness;
        this.rad = rad;
        this.endDrawing = false;
    }

    onMouseDown(coord, event){
        this.endDrawing = false;
        this.ctx.strokeStyle = strokeBrush.color;
        this.ctx.fillStyle = strokeBrush.color;
        this.ctx.lineWidth = this.thickness;
        this.ctx.beginPath();
        this.ctx.moveTo(coord[0],coord[1]);
        this.spray(coord[0],coord[1]);   
        this.endDrawing = false;   
    }

    onDragging(coord,event){
        this.spray(coord[0],coord[1]);
    }

    onMouseMove(){}
    onMouseUp(){
        this.endDrawing = true;
        canvasPush();
    }

    onMouseLeave(){
        if(!this.endDrawing) {
            canvasPush();
        this.endDrawing = true;
    }
    }
    onMouseEnter(){ }

    getRandomOffset(radius) {
        var random_angle = Math.random() * (2*Math.PI);
        var random_radius = Math.random() * radius;
             
        return {
            x: Math.cos(random_angle) * random_radius,
            y: Math.sin(random_angle) * random_radius
        };
    };
    
    spray(x,y) {
  
        let counter = this.density;
        let rad = this.rad; 
        for (var i = 0; i < counter; i++) {
            var offset = this.getRandomOffset(rad);
             
            x = x + offset.x;
            y = y + offset.y;
             
            this.ctx.fillRect(x, y, 1, 1);
            this.ctx.lineTo(x,y);
            this.ctx.moveTo(x,y);
            this.ctx.closePath();
            this.ctx.stroke();
        }
    };
    

    reset(){
        this.endDrawing = false;
        this.points = [];
        this.ctx.clearRect(0,0,canvasDraft.width,canvasDraft.height);
    }

    onDblclick(coord,event){
    }

    onClick(coord,event){

    }
}