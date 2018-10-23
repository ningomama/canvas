let strokeBrush = {
        color: "#000",
        opacity: 1,
        width: 10
    }


let fillBrush = {
        color: "#000",
        opacity: 1,
}


$('.line-color').on('input', function () {
    strokeBrush.color = this.value;
    console.log(strokeBrush.color);
});

$('.fill-color').on('input', function () {
    fillBrush.color = this.value;
});

$('#brush-width').on('input', function () {
    strokeBrush.width = this.value;
    console.log(strokeBrush.width);
});