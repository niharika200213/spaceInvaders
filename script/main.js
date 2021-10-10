function restart(){
    location.reload();
    return false;
}

const playerShip = document.querySelector("#curShip");

const ENEMIES_PER_ROW = 10;
const ENEMY_HORIZONTAL_PADDING = 80;
const ENEMY_VERTICAL_PADDING = 70;
const ENEMY_VERTICAL_SPACING = 80;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const STATE = {
    x_pos : 0,
    y_pos : 0,
    lasers: [],
    enemyLasers: [],
    enemies : [],
    number_of_enemies: 24,
    counter: 0
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

           setInterval(updateEnemiesY,100);

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

setInterval(update, 20);
setInterval(update, 500);

function update(){
    updateEnemiesY();
    updateEnemies(gameArea);
}