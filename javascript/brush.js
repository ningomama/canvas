let strokeBrush = {
        color: "#000",
        // Opacity needs to be reworked to work with undo/redo
        // opacity: 1,
        width: 10,
    }

let fillBrush = {
        color: "#000",
        // Opacity needs to be reworked to work with undo/redo
        // opacity: 1,
}

$('.line-color').on('input', function () {
    strokeBrush.color = this.value;
});

$("#l-nofill").on("click", function(){
    strokeBrush.color = "transparent";
})

$('.fill-color').on('input', function () {
    fillBrush.color = this.value;
});

$("#f-nofill").on("click", function(){
    fillBrush.color = "transparent";
})

$('#brush-width').on('input', function () {
    strokeBrush.width = this.value;

});

// Currently disabled 

// $('#opacity').on('input', function () {
//     strokeBrush.opacity = this.value/10;
// });

