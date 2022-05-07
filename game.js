// Variable section

var buttonColours = ["red","blue","green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameOn = 0;
var level = 0;
var index = 0;


// Next Sequance


function nextSequance (){
  userClickedPattern = [];
  index = 0;
  level ++;
  $("h1").text("Level " +level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(200).fadeIn(200);
  playSound(randomChosenColour);
}

// Sounds

function playSound (name) {
  switch (name) {
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    default:
      console.log("Error: playSound unknown color in switch");
    }
}

// Animation

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

// Checking the answer

function checkAnswer (currentLevel){
  if (gamePattern[index] === userClickedPattern[index]){
    index++;
    if (index === level){
      setTimeout(nextSequance,1000);
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key To Restart");
    wrong.play();
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    gameOver();
  }
}

// Reseting the game

function gameOver(){
  gamePattern = [];
  gameOn = 0;
  level = 0;
}

// Click section

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(index);
});


// start the game

$("body").keydown(function(){
  if (gameOn === 0){
    gameOn++;
    $("h1").text("Level " + level);
    nextSequance();
  }
});
