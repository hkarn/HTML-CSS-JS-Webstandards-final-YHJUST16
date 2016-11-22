/*
By Håkan K Arnoldson
https://github.com/hkarn/HTML-CSS-JS-Webstandards-final-YHJUST16
*/

/*******************************************************
INITATIE LISTENERS
*******************************************************/

window.onload = function() {

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
  document.getElementById("wordbyword-button").style.backgroundColor="dodgerblue";
  document.getElementById("copylists-button").style.backgroundColor="royalblue";
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
  document.getElementById("copylists-button").style.backgroundColor="dodgerblue";
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
      thisWord = new Object();
      thisWord.first = a[i].value;
      thisWord.second = b[i].value;
      thisWord.correct = 0;
      thisWord.mistakes = 0;

      theWords.push(thisWord);
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
      if (lines[0][i] != lines[1][i]) { //removes blank entres. for instance if booth coma and linebreak is used between two words
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

  quiz1();

};

/* QUIZ TYPE 1 */

function quiz1(){

  document.getElementById("quiz1-view-container").style.display = "block";


};