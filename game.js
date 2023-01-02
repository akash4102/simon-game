var userClickedPattern=[];
var gamePattern=[];
var buttonColors=["red","blue","green","yellow"];
var level=0;
var started=false;

$(document).keypress(function(){
    if(!started){
        $("h1").text("level "+level);
        nextSequence();
        started=true;   
    } 
});
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    playSound(currentColour);
    setTimeout(() => {
        $("."+currentColour).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length==userClickedPattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("game over! press any key to restart");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}
