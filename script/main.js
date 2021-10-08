function restart(){
    location.reload();
    return false;
}

const playerShip = document.querySelector("#curShip");

const playerShipdimension = playerShip.getBoundingClientRect();

const shipSpeed = 8;

document.addEventListener('keydown', (e) => {
    
    switch(e.code)
    {

    case "ArrowLeft":
        if( playerShipdimension[left] > 5 )
        {
            playerShipdimension[left] -= shipSpeed; 
        }
    break;

    case "ArrowRight":
        if( playerShipdimension[right] < 1004 )
        {
            playerShipdimension[right] -= shipSpeed;
        }
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

document.addEventListener("keydown", controller.keyListner);
document.addEventListener("keydown", controller.keyListner);    