var buttonColours = ["red","blue","green","yellow"];

var userClickedPattern = [];
var gamePattern = [];

var level = 0;
var started = false;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer((userClickedPattern.length)-1);
});

 
function nextSequence() {
    userClickedPattern = [];

    level++;
    $("h1").text("Level "+ level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}


function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var colorAUdio = new Audio("sounds/"+name+".mp3");
    colorAUdio.play();
}

function checkAnswer(currentLevel) {
    var log = "";
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setInterval(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver()
    }
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}