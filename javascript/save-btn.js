// create and target a save button

// ** this method no longer works in chrome - works in firefox **
// $('#save-btn').on("click", function(){
//     console.log("I have been clicked");
//     window.open(canvasReal.toDataURL());
// })

// Without explicitly drawing a background, the printout only saves the shapes drawn

let button = document.getElementById('btn-download'); 
// this should target an <a> element with href = "#", download = "filename.png"

button.addEventListener('click', function(e){
    console.log("I have been clicked");
    let dataURL = canvasReal.toDataURL('image/png');
    // image url created links back to our a tag href
    button.href = dataURL;
});

