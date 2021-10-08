function restart(){
    location.reload();
    return false;
}
let ship1=document.getElementById("ship1");
let ship2=document.getElementById("ship2");
let ship3=document.getElementById("ship3");

document.getElementById("ship1").addEventListener("click",function(){
    chooseShip(ship1);}
    );
document.getElementById("ship2").addEventListener("click",function(){
    chooseShip(ship2);}
    );
document.getElementById("ship3").addEventListener("click",function(){
    chooseShip(ship3);}
    );

function chooseShip(spaceship){    
    document.getElementById("curShip").innerHTML=spaceship;
}
