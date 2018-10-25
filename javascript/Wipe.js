class Wipe extends PaintFunction{
   constructor(contextReal,contextDraft){
       super();
       this.contextReal = contextReal;   
       this.contextDraft = contextDraft; 
       this.points = [];
       //this.reset();      
   }
   reset(){
       
   }
   finishGraphic(){
   }

   onMouseDown(coord,event){
       
   }
   onDragging(coord,event){
       //drawTarget.lineTo(this.points[i][0],this.points[i][1]);
       //drawTarget.stroke();
       //this.points.push(coord);
       //this.draw(this.contextDraft);
       this.draw(this.contextReal,coord);
   }

   onMouseMove(coord){
   }

   draw(drawTarget , coord){ 
       drawTarget.strokeStyle = "#FFFFFF";
       drawTarget.lineWidth = strokeBrush.width;
       drawTarget.beginPath();
       drawTarget.moveTo(previousMousePosition[0],previousMousePosition[1]);
       for(let i=70 ; i >1 ; i-=5){
         drawTarget.lineTo(previousMousePosition[0]+((previousMousePosition[0]-coord[0])/i),previousMousePosition[1]+((previousMousePosition[1]-coord[1])/i) );
       }
       drawTarget.lineTo(coord[0],coord[1]);
       drawTarget.stroke();
       /*
       if(this.points.length>0){
           //alert('ssss');
           drawTarget.strokeStyle = "#FFFFFF";
           drawTarget.lineWidth = strokeBrush.width;
           drawTarget.beginPath();
           drawTarget.moveTo(this.points[0][0],this.points[0][1]);
           for (let i=0;i<this.points.length-1;i++){
               drawTarget.lineTo(this.points[i][0],this.points[i][1]);
           }
           drawTarget.stroke();
       }
       */
   }

   onMouseUp(coord){
       //this.draw(this.contextReal,coord);
       canvasPush();
       currentFunction = new Wipe(this.contextReal,this.contextDraft);
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