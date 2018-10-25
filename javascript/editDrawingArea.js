class editDrawingArea{
   constructor( topLeftPoint  , bottomRightPoint){
      this.graphicAreaMargin = 10;
      this.reset();
   }
   reset(){
      this.enable = false;
      this.topLeftPoint = [99999,99999];
      this.bottomRightPoint = [-10000,-10000];
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

   get topLeftPointWithMargin() {
      return [this.topLeftPoint[0]-this.graphicAreaMargin,this.topLeftPoint[1]-this.graphicAreaMargin];
   }
   get topRightPointWithMargin() {
      return [this.bottomRightPoint[0]+this.graphicAreaMargin,this.topLeftPoint[1]-this.graphicAreaMargin];
   }
   get bottomLeftPointWithMargin() {
      return [this.topLeftPoint[0]-this.graphicAreaMargin,this.bottomRightPoint[1]+this.graphicAreaMargin];
   }
   get bottomRightPointWithMargin() {
      return [this.bottomRightPoint[0]+this.graphicAreaMargin,this.bottomRightPoint[1]+this.graphicAreaMargin];
   }

}
let graphicArea = new editDrawingArea();


function isPointInGraphicArea(mousePoint){
      // acts like a net to check if mouse points lie within catchment area
      if (graphicArea.topLeftPointWithMargin[0] <= mousePoint[0] && graphicArea.topLeftPointWithMargin[1] <= mousePoint[1] &&
            graphicArea.bottomRightPointWithMargin[0] >= mousePoint[0] && graphicArea.bottomRightPointWithMargin[1] >= mousePoint[1]){
            return true;
      }else{
            return false;
      }
}
function resetGraphicAreaTwoPoints(){
      // extreme values set so that GraphicArea will be able to target min max values
      graphicArea.topLeftPoint = [99999,99999];
      graphicArea.bottomRightPoint = [-10000,-10000];
}
function calculateGraphicAreaSizeInOrigin(pointArray){
      resetGraphicAreaTwoPoints();
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
}
function calculateGraphicAreaSizeInRectangle(pointArray){
      resetGraphicAreaTwoPoints();
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
}
function calculateGraphicAreaSizeInCircle(pointArray){
      resetGraphicAreaTwoPoints();
      let circleRadius = getDistinctFromStartPointToEndPoint(pointArray[0][0] ,
             pointArray[0][1],[pointArray[1][0] , pointArray[1][1]])/2;
      let maxX = (pointArray[0][0] + pointArray[1][0])/2 + circleRadius;
      let maxY = (pointArray[0][1] + pointArray[1][1])/2 + circleRadius;
      let minX = (pointArray[0][0] + pointArray[1][0])/2 - circleRadius;
      let minY = (pointArray[0][1] + pointArray[1][1])/2 - circleRadius;
      
      if( minX <graphicArea.topLeftPoint[0]){
            graphicArea.topLeftPoint[0] = minX;
      }
      if(minY <graphicArea.topLeftPoint[1]){
            graphicArea.topLeftPoint[1] = minY;
      }
      if(maxX>graphicArea.bottomRightPoint[0]){
            graphicArea.bottomRightPoint[0] = maxX;
      }
      if(maxY>graphicArea.bottomRightPoint[1]){
            graphicArea.bottomRightPoint[1] = maxY;
      }
}
function calculateGraphicAreaSize(pointArray){
      switch(true){
      case (currentFunction instanceof DrawingPolygon):
            calculateGraphicAreaSizeInOrigin(pointArray);
            break;
      case (currentFunction instanceof DrawingRectangle):
            calculateGraphicAreaSizeInRectangle(pointArray);
            break;
      case (currentFunction instanceof DrawingCircle):
            calculateGraphicAreaSizeInCircle(pointArray);
            break;
      case (currentFunction instanceof DrawingLine):
            calculateGraphicAreaSizeInOrigin(pointArray);
            break;
      case (currentFunction instanceof DrawingNormal):
            calculateGraphicAreaSizeInOrigin(pointArray);
            break;
      default:
            console.log('No currentFunction or currentFunction not in case selected in calculateGraphicAreaSize(pointArray)');
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
   contextDraft.moveTo(graphicArea.topLeftPointWithMargin[0],graphicArea.topLeftPointWithMargin[1]);
   contextDraft.lineTo(graphicArea.topRightPointWithMargin[0],graphicArea.topRightPointWithMargin[1]);
   contextDraft.lineTo(graphicArea.bottomRightPointWithMargin[0],graphicArea.bottomRightPointWithMargin[1]);
   contextDraft.lineTo(graphicArea.bottomLeftPointWithMargin[0],graphicArea.bottomLeftPointWithMargin[1]);
   contextDraft.lineTo(graphicArea.topLeftPointWithMargin[0],graphicArea.topLeftPointWithMargin[1]);
   contextDraft.closePath();
   contextDraft.stroke();
}

function getDistinctFromStartPointToEndPoint( startX , startY , coord ){
      var XPointDiff = Math.abs(startX - coord[0]);
      XPointDiff *= XPointDiff;
      var YPointDiff = Math.abs(startY - coord[1]);
      YPointDiff *= YPointDiff;
      return Math.sqrt( (XPointDiff+YPointDiff) );
}

//where to use it?
function calculateLengthAbsolute( point1, point2){
   return Math.abs(point1-point2);
}
