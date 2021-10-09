function restart(){
    location.reload();
    return false;
}

const playerShip = document.querySelector("#curShip");


var x = 500;
var y = 5;

const shipSpeed = 8;

let Keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    space: false
};

function move(){

    if(Keys.up){
        if(y < 200){
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

    if(Keys.space){
        createLaser();
    }
}

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
            document.getElementById("ships").style.pointerEvents="none";
            document.addEventListener("keydown", function(e){

                var keycode = e.code;
           
                if(keycode == "ArrowLeft") Keys.left = true;
                if(keycode == "ArrowUp") Keys.up = true;
                if(keycode == "ArrowRight") Keys.right = true;
                if(keycode == "ArrowDown") Keys.down = true;
                if(keycode == "Space") Keys.space = true;
                move();
            });
           
           document.addEventListener("keyup", function(e){
                var keycode = e.code;
           
                if(keycode == "ArrowLeft") Keys.left = false;
                if(keycode == "ArrowUp") Keys.up = false;
                if(keycode == "ArrowRight") Keys.right = false;
                if(keycode == "ArrowDown") Keys.down = false;
                if(keycode == "Space") Keys.space = false;
           });

        }
        else{
            document.getElementById("countdown").innerHTML=i;
            i--;}
    }
}

function start(){
    countdown();
    document.getElementById("start").style.pointerEvents='none';
    document.getElementById("start").onkeydown = function (e) {return false;};
}

let lasers=[];
let enemies=[];

function createLaser(){
    const laser = document.createElement("img");
    var rect=playerShip.getBoundingClientRect();
    var pos_y=rect.top-rect.height*3.5;
    var pos_x=rect.left-rect.width/1.2;
    laser.src = "images/laser.png";
    laser.className = "laser";
    document.querySelector("#gameArea").appendChild(laser);
    const laserObj = {pos_x, pos_y, laser};
    lasers.push(laserObj);
    laser.style.transform = `translate(${pos_x}px, ${pos_y}px)`;
    var id=setInterval(updateLaser,100);
}
  
function updateLaser(){
    for(let i = 0; i < lasers.length; i++){
      const laser = lasers[i];
      laser.pos_y -= 2;
      if (laser.pos_y < 0){
        deleteLaser(laser);
      }
      laser.style.transform = `translate(${pos_x}px, ${pos_y}px)`;
      const laser_rect = laser.getBoundingClientRect();
      for(let j = 0; j < enemies.length; j++){
        const enemy = enemies[j];
        const enemy_rect = enemy.getBoundingClientRect();
        if(collideRect(enemy_rect, laser_rect)){
          deleteLaser(laser);
          const index = enemies.indexOf(enemy);
          enemies.splice(index,1);
          document.querySelector("#gameArea").removeChild(enemy);
        }
      }
    }
}

function deleteLaser(laser){
    const index = lasers.indexOf(laser);
    lasers.splice(index,1);
    document.querySelector("#gameArea").removeChild(laser);
}