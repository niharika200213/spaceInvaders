function restart(){
    location.reload();
    return false;
}

const playerShip = document.querySelector("#curShip");


var x = 500;
var y = 5;

const shipSpeed = 7;

let Keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

document.addEventListener("keydown", function(e){
     var keycode = e.code;

     if(keycode == "ArrowLeft") Keys.left = true;
     if(keycode == "ArrowUp") Keys.up = true;
     if(keycode == "ArrowRight") Keys.right = true;
     if(keycode == "ArrowDown") Keys.down = true;

     move();
 });

document.addEventListener("keyup", function(e){
     var keycode = e.code;

     if(keycode == "ArrowLeft") Keys.left = false;
     if(keycode == "ArrowUp") Keys.up = false;
     if(keycode == "ArrowRight") Keys.right = false;
     if(keycode == "ArrowDown") Keys.down = false;
});

function move(){

    if(Keys.up){
        if(y < 523){
        y +=  shipSpeed;
        document.getElementById("curShip").style.bottom = y + "px";
        }
    }

    if(Keys.down){
        if(y > 5){
        y -=  shipSpeed;
        document.getElementById("curShip").style.bottom = y + "px";
        }
    }

    if(Keys.left) {
       if(x > 10){
        x -= shipSpeed; 
        document.getElementById("curShip").style.left = x + "px";
       }
    }

    if(Keys.right){
        if(x < 997)
        x += shipSpeed;
        document.getElementById("curShip").style.left = x + "px";
    }
}

let ship1=document.getElementById("ship1");
let ship2=document.getElementById("ship2");
let ship3=document.getElementById("ship3");

document.getElementById("ship1").addEventListener("click",function(){
    chooseShip("images/ship1.png");}
    );
document.getElementById("ship2").addEventListener("click",function(){
    chooseShip("images/ship2.png");}
    );
document.getElementById("ship3").addEventListener("click",function(){
    chooseShip("images/ship3.png");}
    );

function chooseShip(spaceship){    
    document.getElementById("curShip").src=spaceship;
}

function countdown(){
    var i=5;
    var id=setInterval(cd,1000);
    function cd(){
        if(i==0){
            document.getElementById("countdown").style.left="43%";
            document.getElementById("countdown").innerHTML="Go!!";
            i--;
        }
        else if(i<0){
            clearInterval(id);
            document.getElementById("countdown").style.display="none";
        }
        else{
            document.getElementById("countdown").innerHTML=i;
            i--;}
    }
}

function start(){
    setTimeout(countdown,500);
}
