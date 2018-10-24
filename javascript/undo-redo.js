let canvasArray = new Array();
let canvasStep = -1;

function canvasPush() {
    canvasStep++;
    if (canvasStep < canvasArray.length) {
        canvasArray.length = canvasStep;
    }
    canvasArray.push(canvasReal.toDataURL());
}

// undo portion

let undo = document.getElementById('undo');

undo.addEventListener('click', function () {
    console.log("I have been clicked");
    if (canvasStep > 0) {
        canvasStep--;
        // It is functionally equivalent to document.createElement('img')
        let canvasImage = new Image();
        canvasImage.src = canvasArray[canvasStep];
        canvasImage.onload = function () {
            contextReal.drawImage(canvasImage, 0, 0);
        }
    }
})

let redo = document.getElementById('redo');

redo.addEventListener('click', function () {
    if (canvasStep < canvasArray.length - 1) {
        canvasStep++;
        var canvasImage = new Image();
        canvasImage.src = canvasArray[canvasStep];
        canvasImage.onload = function () {
            contextReal.drawImage(canvasImage, 0, 0);
        }
    }
})
