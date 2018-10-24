
let i=0;

$("#tool-box").on("click", function(){
    i++
    $(".tool-plate").toggleClass("hide", 3000);
    if(i%2!==0){
    $(this).html(`<i class="fas fa-box-open fa-10x"></i>`)
    } else {
        $(this).html(`<i class="fas fa-box fa-10x"></i>`)
    }
})