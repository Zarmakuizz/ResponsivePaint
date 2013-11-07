var canvas, ctx, paint, size=100;
var shape="square";

function init() {
    // Appelée une fois que la page a été chargée (que le DOM est accessible) 

    canvas = document.querySelector("#mycanvas");
    ctx = canvas.getContext('2d');
    drawForm(10, 10); 
    size=document.querySelector('#size').value;
    // Pour detecter la souris
    if(isMobile()){
        canvas.addEventListener('touchstart', startPressedHandler);
        canvas.addEventListener('touchend', stopPressedHandler);
        canvas.addEventListener('touchmove', movePressedHandler);
    } else {
        canvas.addEventListener('mousedown', clickHandler);
        canvas.addEventListener('mouseup', upHandler);
        canvas.addEventListener('mousemove', moveHandler);
    }
    // Support d'éléments Color custom
    var i = document.createElement("input");
    i.setAttribute("type", "color");
    if(i.type == "text" || isMobile()){
        var colorp = document.querySelector('#color');
        colorp.addEventListener('touchStart',showColor);
        colorp.addEventListener('click',showColor);
        var newimg = document.createElement('img');
        newimg.setAttribute('id','colorpreview');
        newimg.setAttribute('src','images/selector.png');
        colorp.appendChild(newimg);
        var old = document.querySelector('#colorsee');
        document.querySelector('#color').removeChild(old);
    }
    
}
function isMobile(){
    var ismobi = navigator.userAgent.match("Mobi") !== null;
    return ismobi;
}

function changeColor() {
    var color;
    // cas 1 : pas de color selector dans le navigateur
    if(document.querySelector("#colorpreview")){
        if(document.querySelector("#colorpreview").style.backgroundColor){
            color = document.querySelector("#colorpreview").style.backgroundColor;
        } else {
            color = document.querySelector("#colorpreview").style.background;
        }
    }else{ // cas 2 : le color selector est utilisé
        color = document.querySelector("#colorsee").value;
    }
    console.log("new color :" + color);
    ctx.fillStyle=color;
}
function showColor(){
    $("#mobileSelector").show(500);
}
/* Triggered only if the color selector is not applied */
function updateColor(color) {
    document.querySelector("#colorpreview").style.background = color;
    changeColor();
}
// For test purpose only
function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

function changeSize(){
  size = document.querySelector("#size").value;
}

function changeShape(){
  shape = document.querySelector("#shapes").value;
  console.log("shape:"+shape);
}

function drawForm(x, y) {
  switch(shape){
      case "circle":
        ctx.beginPath();
        ctx.arc(x,y,size/2,0,Math.PI*2,true);
        ctx.closePath();
        ctx.fill();
        break;
      case "star":
        drawStar(ctx,x,y,size/1.85,5,0.5);
        break;
      default:
      case "square":
        ctx.fillRect(x-(size/2), y-(size/2), size, size);
        break;
  } 
}
// Tactile contact: start pressing screen
function startPressedHandler(event){
    event.preventDefault();
    //paint=true;
    var touch = event.touches[0];
    drawForm(touch.pageX,touch.pageY);
}
// Mouse contact: start clicking
function clickHandler(event) {
    paint = true;
    var mouse = getMousePos(canvas, event);
    drawForm(mouse.x, mouse.y);
}
// Tactile contact: stop pressing screen
function stopPressedHandler(event){
    event.preventDefault();
    //paint=false;
}
// Mouse contact: stop clicking
function upHandler(event) {
  paint = false;
}
// Tactile contact: move while pressing
function movePressedHandler(event){
    event.preventDefault();
    if(true){
        var touch = event.touches[0];
        drawForm(touch.pageX,touch.pageY);
    }
}
// Mouse contact: move mouse (here when clicked, when unclicked who cares?)
function moveHandler(event) {
  if(paint) { // Mouse contact when mouse is clicked.
    var mouse = getMousePos(canvas, event);
    drawForm(mouse.x, mouse.y);
  }
}


// Pas si facile d'avoir une "bonne position" de la souris, car la page peut scroller, le canvas être dans d'autres objets, avoir des marges, du padding, etc... 
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// draw a star
// canvas, x pos, y pos, radius, number of points, fraction of radius for inset
function drawStar(ctx, x, y, r, p, m)
{
    ctx.save();
    ctx.beginPath();
    ctx.translate(x, y);
    ctx.moveTo(0,0-r);
    for (var i = 0; i < p; i++)
    {
        ctx.rotate(Math.PI / p);
        ctx.lineTo(0, 0 - (r*m));
        ctx.rotate(Math.PI / p);
        ctx.lineTo(0, 0 - r);
    }
    ctx.fill();
    ctx.restore();
}
