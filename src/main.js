(function(){

let startNewGame = false;
let currentWord, numberErrors, rightAnswers, prevWord;
let timer, time;
let words = ["corner" , "Asgard", "comment" , "repeat" , "The Matrix" ,"special", "Looney" , "jQuery" , "the DOM" , "downtown", "Kastiel" , "NodeJS" , "various" , "SuperNatural" , "very hard" , "jaguar" , "Mercedes-Benz" , "Come On" , "React and Angular" , "fraud" , "football" , "beef" , "cosmos", "Legion", "Thor", "prescious", "drone", "complementary", "Ragnarok"];

$(document).ready(function() {
  $(document).keypress(function(elem) {
      if(elem.which == 13) {
          enterWord();
      }
  });
  $("#startBtn").click(function () {
    startGame();
    $("#startBtn").hide();
  });
});

function startGame() {
  //Initialize start
  startNewGame = true;
  document.getElementById("wordField").focus();
  //Reset all variables
  numberErrors = 0;
  rightAnswers = 0;
  $("#currentWord").html("");
  $("#errors").html("");
  $("#wpm").html("");
  pickWord();
  //start the timer
  $("#timer").show();
  startTimer();
}


function startTimer() {
  time = 30;
  timer = setInterval(function () {
    if (time <= 0) {
      endGame();
    }
    time -= 0.1;
    $("#timer").html("Seconds left: " + time.toFixed(0))
  },100);
}

function enterWord () {
  if (startNewGame === true) {
    checkWord();
  }
}

function checkWord () {
    var enteredWord = $("#wordField").val();

    //Check if the player typed the correct string
    if (enteredWord === currentWord) {
      //if true
      fadeColor("wordField", "backgroundColor", "green");
      $("#wordField").val("");
      pickWord();
      rightAnswers++;
      prevWord = currentWord;
    } else {
      //if false
      numberErrors++;
      fadeColor("wordField", "backgroundColor", "red");
    }
}
function pickWord () {
  let word = words;
  let randomWord = Math.floor(Math.random() * words.length);
  currentWord = words[randomWord];
  if (currentWord === prevWord) {
    pickWord();
  } else {
    $("#currentWord").html(currentWord);
  }
}
function endGame () {
  clearInterval(timer);
  $("#timer").hide();
  $("#startBtn").show();
  $("#wordField").val("");
  startNewGame = false;
    
  // Results:
  $("#currentWord").html("End Game! Play Another?");
  $("#errors").html("Number of errors: " + numberErrors);
  $("#wpm").html("Correct Words for 30 seconds: " + rightAnswers);

}

function fadeColor(id, property, newColor) {
  const element = $("#" + id);
    const oldColor= element.css(property);
    element.css(property, newColor);
    setTimeout(() => element.css(property, oldColor), 300);
}
})();