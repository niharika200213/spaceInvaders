function restart(){
    location.reload();
    return false;
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

let playerShip = document.querySelector("#curShip");

const STATE = {
    x_pos : 0,
    y_pos : 0,
    lasers: [],
    enemyLasers: [],
    enemies : [],
    number_of_enemies: 24,
    counter: 0,
    lives: 3
}

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
           
            setInterval(update, 20);

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

function setPosition($enemy, x, y) {
    $enemy.style.transform = `translate(${x+180}px, ${y}px)`;
}

function createEnemy(gameArea, x, y){
    const $enemy = document.createElement("img");
    $enemy.src = "/images/alien1.png";
    $enemy.className = "enemy";
    gameArea.appendChild($enemy);
    const enemy = {x, y, $enemy};
    STATE.enemies.push(enemy);
    setPosition($enemy, x, y);
}
  
function updateEnemies()
{
    const dx = 70*Math.cos(Date.now()/500);
    const dy = 40*Math.sin(Date.now()/500) + STATE.counter;
    const enemies = STATE.enemies;
    for (let i = 0; i < enemies.length; i++){
      const enemy = enemies[i];
      var a = enemy.x + dx;
      var b = enemy.y + dy;
      setPosition(enemy.$enemy, a, b);
      if (enemy.enemy_cooldown == 0){
        createEnemyLaser($container, a, b);
      }
    }
}

function updateEnemiesY()
{
    STATE.counter += 0.125;
}

function createEnemies(gameArea) {
    for(var i = 0; i <= STATE.number_of_enemies/3; i++){
      createEnemy(gameArea, i*80, 100);
    } 
    for(var i = 0; i <= STATE.number_of_enemies/3; i++){
      createEnemy(gameArea, i*80, 180);
    }
    for(var i = 0; i <= STATE.number_of_enemies/3; i++){
        createEnemy(gameArea, i*80, 260);
    }
}

const gameArea = document.querySelector("#gameArea");
createEnemies(gameArea);

setInterval(updateEnemies,10);

function update(){
    updateEnemiesY();
    updateEnemies(gameArea);
}

function collideRect(rect1, rect2){
    return!(rect2.left > rect1.right || 
      rect2.right < rect1.left || 
      rect2.top > rect1.bottom || 
      rect2.bottom < rect1.top);
}

function lives(){
    if(STATE.lives>0){
        document.getElementById(`star${STATE.lives}`).display="none";
        STATE.lives--;
    }
    else{
        document.getElementById("countdown").style.fontSize=50+"px";
        document.getElementById("countdown").innerHTML="You Lost! Restart";
    }
}