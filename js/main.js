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

};

/*******************************************************
GLOBAL FUNCTIONS
*******************************************************/

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
  var li = document.createElement("li");
  var input = document.createElement("input");
  input.type = "text";
  input.className = "a-word";

  li.appendChild(input);

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
  document.getElementById("wordbyword-button").style.backgroundColor="grey";
  document.getElementById("copylists-button").style.backgroundColor="black";
};

function showWordbyword() {
  /* Shows word by word input style and changes color of selected active choice button */
  var a = document.getElementsByClassName("wordlist-area-input");
  var b = document.getElementsByClassName("wordlist-lines-input");
  for(var i = 0; i < a.length; i++){
    a[i].style.display="none";
    b[i].style.display="inline-block";
  };
  document.getElementById("wordbyword-button").style.backgroundColor="black";
  document.getElementById("copylists-button").style.backgroundColor="grey";
};

/*******************************************************
IMPORT EXPORT FUNCTONS
*******************************************************/

/*******************************************************
QUIZZ TYPE 1 FUNCTIONS
*******************************************************/