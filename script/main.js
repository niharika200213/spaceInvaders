function restart(){
    location.reload();
    return false;
}

const playerShip = document.querySelector("#curShip");
const playerShipdimension = playerShip.getBoundingClientRect();
var x = playerShipdimension.left
const shipSpeed = 7;

document.addEventListener('keydown', (e) => {
    switch(e.code)
    {
    case "ArrowLeft":
        console.log("foo");
        if( x > 15 ){
            x -= shipSpeed; 
            document.getElementById("curShip").style.left = x + "px";
        }
    break;

    case "ArrowRight":
        console.log("fee");
        if( x < 985){
            x += shipSpeed;
            document.getElementById("curShip").style.left = x + "px";
        }
    break;
    }

});


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
