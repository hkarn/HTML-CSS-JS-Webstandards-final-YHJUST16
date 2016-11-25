/*
By Håkan K Arnoldson
https://github.com/hkarn/HTML-CSS-JS-Webstandards-final-YHJUST16
*/

// some jQuery functions

function checkSize(){

  /*checks for a change from the css media query for the advertisment.
  handled by jQuery booth due to assignment specification demands and problems with 
  fadeout on display: none using keyframes */

    if ($('#right-advertisment').css('color') == 'rgb(0, 0, 0)' ){
      $('#right-advertisment').fadeOut(340);
    };
    if ($('#right-advertisment').css('color') == 'rgb(255, 255, 255)' ){
      $('#right-advertisment').fadeIn(5000);
    };
};


/*******************************************************
INITATIE LISTENERS
*******************************************************/

window.onload = function() {
  
  //jQuery on load
  if ($('#right-advertisment').css('color') == 'rgb(0, 0, 0)' ){
    $('#right-advertisment').fadeOut(1);
    };
  if ($('#right-advertisment').css('color') == 'rgb(255, 255, 255)' ){
    $('#right-advertisment').fadeIn(5000);
    };
  $(window).resize(checkSize);


  /* Language list listener */

  var a = document.getElementsByClassName("language-list");
  for(var i = 0; i < a.length; i++){
    var b = a[i].getElementsByTagName('li');
    for(var j = 0; j < b.length; j++){
      b[j].addEventListener('click', function(){
         selectLang(this);
       });
    };
  };

  /* Word input type selector */

  var a = document.getElementById("wordbyword-button");
  a.addEventListener('click', function(){
         showWordbyword();
       });

  var a = document.getElementById("copylists-button");
  a.addEventListener('click', function(){
         showTextarea();
       });

  /* Add word lines in word by word input */

  var a = document.getElementsByClassName("addline-button");
  for(var i = 0; i < a.length; i++){
    a[i].addEventListener('click', function(){
         addLine();
       });
  };

  /* Start quiz */

  var a = document.getElementById("start-quiz-button");
  a.addEventListener('click', function(){
         initiateQuiz();
       });

};



/*******************************************************
GLOBAL
*******************************************************/

theWords = new Array();

/*******************************************************
INPUT VIEW FUNCTIONS
*******************************************************/

function selectLang(position) {
  var language = position.getAttribute('lang');
  var a = position.parentNode.parentNode;
  var b = a.getElementsByTagName('button')[0].getElementsByTagName('span')[0];
  b.setAttribute('lang', language);
  var c = a.getElementsByTagName('input')[0];
  c.setAttribute('value', language);
};

function addLine() {
  /* Adds another input line for word by word */

  var a = document.getElementsByClassName("wordlist-lines-thelines");
  for (var i = 0; i < a.length; i++){
    var li = document.createElement("li");
    var input = document.createElement("input");
    input.type = "text";
    input.className = "a-word";
    li.appendChild(input);
    a[i].appendChild(li);
  };

};

function showTextarea() {
  /* Shows text area input style and changes color of selected active choice button */
  var a = document.getElementsByClassName("wordlist-area-input");
  var b = document.getElementsByClassName("wordlist-lines-input");
  for(var i = 0; i < a.length; i++){
    a[i].style.display="inline-block";
    b[i].style.display="none";
  };
  document.getElementById("wordbyword-button").style.backgroundColor="white";
  document.getElementById("copylists-button").style.backgroundColor="royalblue";
  document.getElementById("wordbyword-button").style.color="black";
  document.getElementById("copylists-button").style.color="white";
};

function showWordbyword() {
  /* Shows word by word input style and changes color of selected active choice button */
  var a = document.getElementsByClassName("wordlist-area-input");
  var b = document.getElementsByClassName("wordlist-lines-input");
  for(var i = 0; i < a.length; i++){
    a[i].style.display="none";
    b[i].style.display="inline-block";
  };
  document.getElementById("wordbyword-button").style.backgroundColor="royalblue";
  document.getElementById("copylists-button").style.backgroundColor="white";
  document.getElementById("wordbyword-button").style.color="white";
  document.getElementById("copylists-button").style.color="black";
};

/*******************************************************
IMPORT EXPORT FUNCTONS
*******************************************************/


/*******************************************************
QUIZZ FUNCTIONS
*******************************************************/

function initiateQuiz() {
  var firstlanguage = document.getElementsByName("first-language")[0].value;
  var secondlanguage =  document.getElementsByName("second-language")[0].value;
  var a = document.getElementsByClassName("wordlist-area-input")[0];

  //first in theWords object keeps track of langages
  thisWord = new Object();
  thisWord.first = firstlanguage;
  thisWord.second = secondlanguage;
  thisWord.correct = -1;
  thisWord.mistakes = -1;
  theWords[0] = thisWord;

  if (window.getComputedStyle(a, null).getPropertyValue("display") == "none") { 
    // read word by word input
    var a = document.getElementsByClassName("wordlist-lines-thelines")[0].getElementsByClassName("a-word");
    var b = document.getElementsByClassName("wordlist-lines-thelines")[1].getElementsByClassName("a-word");
    for (var i = 0; i < a.length; i++) {
      if ((a[i].value != "") && (b[i].value != "")) { //removes blanks
        thisWord = new Object();
        thisWord.first = a[i].value;
        thisWord.second = b[i].value;
        thisWord.correct = 0;
        thisWord.mistakes = 0;

        theWords.push(thisWord);
      };
    };

  } else {
    //read text area input
    var a = document.getElementsByClassName("wordlist-area-input");
    var lines = new Array();
    for (var x = 0; x < a.length; x++) {
      var txtBox = a[i];
      var linestmp1 = txtBox.value.split("\n");
      var linestmp2 = new Array();
      var n = 0;
      for (var i=0; i < linestmp1.length; i++) {
        linestmp2[i] = linestmp1[i].split(",");
        for (var j = 0; j < linestmp2[i].length; j++) {
          lines[x][n] = linestmp2[i][j];
          n++;
        };
      };
    };

    for (var i = 0; i < lines1.length; i++) {
      if ((lines[0][i] != "") && (lines[1][i] != "")) { //removes blank entres. for instance if booth coma and linebreak is used between two words
        thisWord = new Object();
        thisWord.first = lines[0][i];
        thisWord.second = lines[1][i];
        thisWord.correct = 0;
        thisWord.mistakes = 0;

        theWords.push(thisWord);
      };
    };


    
  };
  //theWords array of objects created containing wordlist.

  //Hiding the start page elements and moving on to initilize the desired quiz.
  //Only one quiz type is availiable but seperating the functions and container elements makes it easier to add more if desired later.

  document.getElementById("start-view-container").style.display = "none";
  document.getElementById("quiz-view-container").style.display = "block";

  quiz(1);

};

// QUIZ FUNCTIONS

function random(min,max) {
  return (Math.floor(Math.random() * (parseInt(max,10) - parseInt(min,10) + 1)) + parseInt(min,10));
};

function checkAnswer(foundnumber) {
  if (theWords[foundnumber].second == document.getElementById("the-quiz-answer").value) {
    theWords[foundnumber].correct++;
    return true;
  } else {
    theWords[foundnumber].mistakes++;
    return false;
  }

};

function quizErazer() {
  var myNode = document.getElementById("quiz-question");
        while (myNode.firstChild) {
          myNode.firstChild.style.display = "none";
          myNode.removeChild(myNode.firstChild);
        };
        var myNode = document.getElementById("quiz-answer");
        while (myNode.firstChild) {
          myNode.firstChild.style.display = "none";
          myNode.removeChild(myNode.firstChild);
        };
};

function quiz(choice){

//this is made to make it easy to add more quiz types later.

  switch(choice) {
  case 1:
    document.getElementById("quiz-view-container").style.display = "block";

    //first check if there are still words that havent been answered correct
    var flag = false;
    for (var i = 1; i < theWords.length; i++) { //skips the first word cause it contains the active languages
      if (theWords[i].correct > 0) {
        flag = true;
      };
    };
    var found = false;
    var foundnumber = -1;
    for (var i = 1; found == false && i<theWords.length+50; i++) { //finds a random word with zero correct answers. breaks if not found on words+50 and simply picks the first in the array instead with zero correct
      var rand = random(1,theWords.length-1); //generates random variable between 1 and the amount of words excluding the langauge setting
      if (theWords[rand].correct < 1) {
        found = true;
        foundnumber = rand;
      };
    };
    if (found == false) {
      for (var i = 1; i<theWords.length; i++) {
        if (theWords[i].correct < 1) {
          found = true;
          foundnumber = i;
        };
      };
    };

    if (found == true) { //find word sequence failed all words have been answered correct. break quiz here

    var t = document.createTextNode(theWords[foundnumber].first);
    var p = document.createElement("p");
    p.className = "the-question";
    p.appendChild(t);
    document.getElementById("quiz-question").appendChild(p);

    var input = document.createElement("input");
    input.className = "quiz-answer";
    input.id = "the-quiz-answer";
    input.type = "text";
    document.getElementById("quiz-answer").appendChild(input);

    var t = document.createTextNode("Answer");
    var button = document.createElement("button");
    button.id = "quiz-answer-button";
    button.appendChild(t);
    button.addEventListener('click', function(){
        if (checkAnswer(foundnumber) == true) {
          var div = document.createElement("div")
          div.className = "block-clear";
          document.getElementById("quiz-answer").appendChild(div);
          var t = document.createTextNode("Correct!");
          var button = document.createElement("button");
          button.id = "quiz-correct-answer-button";
          button.appendChild(t);
          button.addEventListener('click', function(){
            quizErazer(); //restarts the quiz for another word after correct
            quiz(1); 
          });
          document.getElementById("quiz-answer").appendChild(button);
        } else {
          var div = document.createElement("div")
          div.className = "block-clear";
          document.getElementById("quiz-answer").appendChild(div);
          var t = document.createTextNode("Sorry wrong!");
          var button = document.createElement("button");
          button.id = "quiz-wrong-answer-button";
          button.appendChild(t);
          button.addEventListener('click', function(){
            quizErazer(); //restarts the quiz for another word after wrong
            quiz(1);
          });
          document.getElementById("quiz-answer").appendChild(button);
          var div = document.createElement("div")
          div.className = "block-clear";
          document.getElementById("quiz-answer").appendChild(div);
          var t = document.createTextNode("Correct answer: " + theWords[foundnumber].second);
          var p = document.createElement("p");
          p.className = "the-right-answer";
          p.appendChild(t);
          document.getElementById("quiz-answer").appendChild(p);

        };

        
      });
    document.getElementById("quiz-answer").appendChild(button);

    } else {

    //clears the quiz and prints final results and end message

    quizErazer();
    var t = document.createTextNode("You have answered all words correct hurray!");
    var p = document.createElement("p");
    p.className = "quiz-finished";
    p.appendChild(t);
    document.getElementById("quiz-answer").appendChild(p);

    var div = document.createElement("div")
    div.className = "block-clear";
    document.getElementById("quiz-answer").appendChild(div);

    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var t = document.createTextNode("Native language");
    td.appendChild(t);
    tr.appendChild(td);
    var td = document.createElement("td");
    var t = document.createTextNode("Foreign language");
    td.appendChild(t);
    tr.appendChild(td);
    var td = document.createElement("td");
    var t = document.createTextNode("Mistakes made");
    td.appendChild(t);
    tr.appendChild(td);
    table.appendChild(tr);

    for (var i = 1; i < theWords.length; i++) {
      var tr = document.createElement("tr");
      var td = document.createElement("td");
      var t = document.createTextNode(theWords[i].first);
      td.appendChild(t);
      tr.appendChild(td);
      var td = document.createElement("td");
      var t = document.createTextNode(theWords[i].second);
      td.appendChild(t);
      tr.appendChild(td);
      var td = document.createElement("td");
      var t = document.createTextNode(theWords[i].mistakes);
      td.appendChild(t);
      tr.appendChild(td);
      table.appendChild(tr);
    }
    document.getElementById("quiz-answer").appendChild(table);

    var div = document.createElement("div")
    div.className = "block-clear";
    document.getElementById("quiz-answer").appendChild(div);

    var t = document.createTextNode("Back to start");
    var button = document.createElement("button");
    button.id = "quiz-to-start-button";
    button.appendChild(t);
    button.addEventListener('click', function(){
      quizErazer(); //restarts the quiz for another word after wrong
      document.getElementById("quiz-view-container").style.display = "none";
      document.getElementById("start-view-container").style.display = "block";
          });
      document.getElementById("quiz-answer").appendChild(button);
    };

    

    break;
    
  default:  //returns to input view if something is wrong
    document.getElementById("start-view-container").style.display = "block";
    document.getElementById("quiz-view-container").style.display = "none";
    break;
  }

};