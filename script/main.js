function restart(){
    location.reload();
    return false;
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