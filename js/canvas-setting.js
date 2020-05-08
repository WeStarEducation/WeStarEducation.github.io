function lineInitiate(){
    var canvas = document.getElementById("line-canvas");
    var divC = document.getElementById("div-canvas");
    var width = divC.offsetWidth;
    var height = divC.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    var ctx = canvas.getContext("2d");
        ctx.strokeStyle="#385D8A";
        ctx.moveTo(0,90);
        ctx.lineTo(width-30,height-100);
        ctx.lineTo(width,height-100);
        ctx.stroke();

}

window.onload = function () {
    lineInitiate();
}