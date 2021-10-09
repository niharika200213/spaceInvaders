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
    move_right: false,
    move_left: false,
    shoot: false,
    lasers: [],
    enemyLasers: [],
    enemies : [],
    spaceship_width: 50,
    enemy_width: 50,
    cooldown : 0,
    number_of_enemies: 16,
    enemy_cooldown : 0,
    gameOver: false
  }

var x = 500;
var y = 5;


const shipSpeed = 10;

let Keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

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
                move();
            });
           
           document.addEventListener("keyup", function(e){
                var keycode = e.code;
           
                if(keycode == "ArrowLeft") Keys.left = false;
                if(keycode == "ArrowUp") Keys.up = false;
                if(keycode == "ArrowRight") Keys.right = false;
                if(keycode == "ArrowDown") Keys.down = false;
           });

        }
        else{
            document.getElementById("countdown").innerHTML=i;
            i--;}
    }
}

function start(){
    setTimeout(countdown,100);
}


// function createEnemy(gameArea, x, y) {
//     const $enemy = document.createElement("img");
//     $enemy.src = "img/enemy-blue-1.png";
//     $enemy.className = "enemy";
//     gameArea.appendChild($enemy);
//     const enemy = {
//       x,
//       y,
//       $enemy
//     };


// const enemySpacing = (GAME_WIDTH - ENEMY_HORIZONTAL_PADDING * 2) / (ENEMIES_PER_ROW - 1);
//     for (let j = 0; j < 3; j++) {
//       const y = ENEMY_VERTICAL_PADDING + j * ENEMY_VERTICAL_SPACING;
//       for (let i = 0; i < ENEMIES_PER_ROW; i++) {
//         const x = i * enemySpacing + ENEMY_HORIZONTAL_PADDING;
//         createEnemy(gameArea, x, y);
//         setPosition(element, x, y);
//       }
//     }

function setPosition($enemy, x, y) {
    $enemy.style.transform = `translate(${x+180}px, ${y}px)`;
  }

function createEnemy(gameArea, x, y){
    const $enemy = document.createElement("img");
    $enemy.src = "/images/alien1.png";
    $enemy.className = "enemy";
    gameArea.appendChild($enemy);
    const enemy_cooldown = Math.floor(Math.random()*100);
    const enemy = {x, y, $enemy, enemy_cooldown};
    STATE.enemies.push(enemy);
    setPosition($enemy, x, y);
  }
  

   function updateEnemies() //(gameArea)
   {
    const dx = Math.sin(Date.now()/1000)*40;
    const dy = Math.cos(Date.now()/1000)*30;

    const enemies = STATE.enemies;

    for (let i = 0; i < enemies.length; i++){
      const enemy = enemies[i];
      var a = enemy.x + dx;
      var b = enemy.y + dy;
      setPosition(enemy.$enemy, a, b);
      enemy.cooldown = Math.random(0,100);
      if (enemy.enemy_cooldown == 0){

        enemy.enemy_cooldown = Math.floor(Math.random()*50)+100;
      }
      enemy.enemy_cooldown -= 0.5;
    }
  }

function createEnemies(gameArea) {

    for(var i = 0; i <= STATE.number_of_enemies/2; i++){
      createEnemy(gameArea, i*80, 100);
    } 
    for(var i = 0; i <= STATE.number_of_enemies/2; i++){
      createEnemy(gameArea, i*80, 180);
    }

  }


  const gameArea = document.querySelector("#gameArea");
  createEnemies(gameArea);
  setInterval(() => {
    update();
  }, 45);


  function update(){
    updateEnemies(gameArea);
  }


