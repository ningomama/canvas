class editDrawingArea{
   constructor( topLeftPoint  , bottomRightPoint){
      this.enable = false;
      this.topLeftPoint = [9999,9999];
      this.bottomRightPoint = [0,0];
   }

   reset(){
      this.enable = false;
      this.topLeftPoint = [9999,9999];
      this.bottomRightPoint = [0,0];
   }

   get TopLeftPoint() {
      return this.topLeftPoint;
   }
   set TopLeftPoint(point) {
      this.topLeftPoint = point;
   }
   get BottomRightPoint() {
      return this.bottomRightPoint;
   }
   set BottomRightPoint(point) {
      this.bottomRightPoint = point;
   }
   set Enable(trueFalse) {
      this.enable = trueFalse;
   }

}
let graphicArea = new editDrawingArea();

function isPointInGraphicArea(point){
   if (graphicArea.topLeftPoint[0] <= point[0] && graphicArea.topLeftPoint[1] <= point[1]){
      if(graphicArea.bottomRightPoint[0] >= point[0] && graphicArea.bottomRightPoint[1] >= point[1]){
            return true;
      }
   }
   return false;
}

function calculateGraphicAreaSize(pointArray){
   switch(true){
      case (currentFunction instanceof DrawingPolygon):
         graphicArea.topLeftPoint = [99999,99999];
         graphicArea.bottomRightPoint = [0,0];
         for(let i=0 ; i < pointArray.length ;i++){
            if(pointArray[i][0]<graphicArea.topLeftPoint[0]){
               graphicArea.topLeftPoint[0] = pointArray[i][0];
            }
            if(pointArray[i][1]<graphicArea.topLeftPoint[1]){
               graphicArea.topLeftPoint[1] = pointArray[i][1];
            }
            if(pointArray[i][0]>graphicArea.bottomRightPoint[0]){
               graphicArea.bottomRightPoint[0] = pointArray[i][0];
            }
            if(pointArray[i][1]>graphicArea.bottomRightPoint[1]){
               graphicArea.bottomRightPoint[1] = pointArray[i][1];
            }
         }
         break;
      case (currentFunction instanceof DrawingRectangle):
         graphicArea.topLeftPoint = [99999,99999];
         graphicArea.bottomRightPoint = [0,0];
         let maxX = Math.max( pointArray[0][0], pointArray[1][0]);
         let maxY = Math.max( pointArray[0][1], pointArray[1][1]);
         let minX = Math.min( pointArray[0][0], pointArray[1][0]);
         let minY = Math.min( pointArray[0][1], pointArray[1][1]);
         if(minX<graphicArea.topLeftPoint[0]){
            graphicArea.topLeftPoint[0] = minX;
         }
         if(minY<graphicArea.topLeftPoint[1]){
            graphicArea.topLeftPoint[1] = minY;
         }
         if(maxX>graphicArea.bottomRightPoint[0]){
            graphicArea.bottomRightPoint[0] = maxX;
         }
         if(maxY>graphicArea.bottomRightPoint[1]){
            graphicArea.bottomRightPoint[1] = maxY;
         }
         break;
      case (currentFunction instanceof DrawingCircle):
         graphicArea.topLeftPoint = [99999,99999];
         graphicArea.bottomRightPoint = [0,0];
         let circleRadius = currentFunction.getDistinctFromStartPointToEndPoint(pointArray[0][0] , pointArray[0][1],[pointArray[1][0] , pointArray[1][1]])/2;
         let circleMaxX = (pointArray[0][0] + pointArray[1][0])/2 + circleRadius;
         let circleMaxY = (pointArray[0][1] + pointArray[1][1])/2 + circleRadius;
         let circleMinX = (pointArray[0][0] + pointArray[1][0])/2 - circleRadius;
         let circleMinY = (pointArray[0][1] + pointArray[1][1])/2 - circleRadius;
         
         if( circleMinX <graphicArea.topLeftPoint[0]){
            graphicArea.topLeftPoint[0] = circleMinX;
         }
         if(circleMinY <graphicArea.topLeftPoint[1]){
            graphicArea.topLeftPoint[1] = circleMinY;
         }
         if(circleMaxX>graphicArea.bottomRightPoint[0]){
            graphicArea.bottomRightPoint[0] = circleMaxX;
         }
         if(circleMaxY>graphicArea.bottomRightPoint[1]){
            graphicArea.bottomRightPoint[1] = circleMaxY;
         }
         break;
      case (currentFunction instanceof DrawingLine):
         graphicArea.topLeftPoint = [99999,99999];
         graphicArea.bottomRightPoint = [0,0];
         for(let i=0 ; i < pointArray.length ;i++){
            if(pointArray[i][0]<graphicArea.topLeftPoint[0]){
               graphicArea.topLeftPoint[0] = pointArray[i][0];
            }
            if(pointArray[i][1]<graphicArea.topLeftPoint[1]){
               graphicArea.topLeftPoint[1] = pointArray[i][1];
            }
            if(pointArray[i][0]>graphicArea.bottomRightPoint[0]){
               graphicArea.bottomRightPoint[0] = pointArray[i][0];
            }
            if(pointArray[i][1]>graphicArea.bottomRightPoint[1]){
               graphicArea.bottomRightPoint[1] = pointArray[i][1];
            }
         }
         break;
      case (currentFunction instanceof DrawingNormal):
         graphicArea.topLeftPoint = [99999,99999];
         graphicArea.bottomRightPoint = [0,0];
         for(let i=0 ; i < pointArray.length ;i++){
            if(pointArray[i][0]<graphicArea.topLeftPoint[0]){
               graphicArea.topLeftPoint[0] = pointArray[i][0];
            }
            if(pointArray[i][1]<graphicArea.topLeftPoint[1]){
               graphicArea.topLeftPoint[1] = pointArray[i][1];
            }
            if(pointArray[i][0]>graphicArea.bottomRightPoint[0]){
               graphicArea.bottomRightPoint[0] = pointArray[i][0];
            }
            if(pointArray[i][1]>graphicArea.bottomRightPoint[1]){
               graphicArea.bottomRightPoint[1] = pointArray[i][1];
            }
         }
         break;
      default:
   }

}

function handleGraphicAreaMove(point){
   let xDiff = point[0]-previousMousePosition[0];
   let yDiff = point[1]-previousMousePosition[1];
   graphicArea.topLeftPoint = [(graphicArea.topLeftPoint[0] + xDiff) , ( graphicArea.topLeftPoint[1] + yDiff)];
   graphicArea.bottomRightPoint = [(graphicArea.bottomRightPoint[0] + xDiff) , ( graphicArea.bottomRightPoint[1] + yDiff)];
}

function drawGraphicAreaInDraft(){
   contextDraft.strokeStyle = "black";
   contextDraft.lineJoin = "";
   contextDraft.lineWidth = 1;
   contextDraft.beginPath();
   contextDraft.moveTo(graphicArea.topLeftPoint[0],graphicArea.topLeftPoint[1]);
   contextDraft.lineTo(graphicArea.bottomRightPoint[0],graphicArea.topLeftPoint[1]);
   contextDraft.lineTo(graphicArea.bottomRightPoint[0],graphicArea.bottomRightPoint[1]);
   contextDraft.lineTo(graphicArea.topLeftPoint[0],graphicArea.bottomRightPoint[1]);
   contextDraft.lineTo(graphicArea.topLeftPoint[0],graphicArea.topLeftPoint[1]);
   
   contextDraft.closePath();
   contextDraft.stroke();
   //alert('pspsps');
}

function calculateLengthAbsolute( point1, point2){
   return Math.abs(point1-point2);
}
