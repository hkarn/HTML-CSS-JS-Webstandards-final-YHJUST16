/*
By Håkan K Arnoldson
https://github.com/hkarn/HTML-CSS-JS-Webstandards-final-YHJUST16
*/

// some jQuery functions

function checkSize(){

  /*checks for a change from the css media query for the advertisement.
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
  if ($('#right-advertisment').css('color') == 'rgb(255, 255, 255)' ){
    $('#right-advertisment').fadeIn(6000);
    };
  $(window).resize(checkSize);


  // IMPORT
  $("#menu-import").on("click", function(e) {
    e.preventDefault();
    e.stopPropagation();

    if ( $("#import-export-container").css("display") == "none" ) {

      $("#import-export-container").show();
      var button = $("<button></button>").text("IMPORT");
      $(button).attr("id","import-export-button");
      $(button).appendTo("#import-export-container");

      $( "#import-export-button" ).click(function() {
        //import
        importCSV($("textarea#import-export-text").val());
      });

      var button = $("<button></button>").text("CLOSE");
      $(button).attr("id","import-export-close-button");
      $(button).appendTo("#import-export-container");

      $( "#import-export-close-button" ).click(function() {
        //clean export and hide box.
        $("#import-export-container").find('a').remove();
        $("#import-export-button").remove();
        $("#import-export-close-button").remove();
        $("#import-export-container").hide();
      });

    }
    


  });


  // EXPORT
  $("#menu-export").on("click", function(e) {
    e.preventDefault();
    e.stopPropagation();

    if ( $("#import-export-container").css("display") == "none" ) { //only executes if import/export window is closed

      $("#import-export-container").show();
      var csvexport = getCSVexport();
      $("textarea#import-export-text").text(csvexport);

      //creates a which is csv download link
      var a = document.createElement('a');
      with (a) {
      href='data:text/csv;base64,' + btoa(csvexport);
      download='csvfile.csv';
      };
      
      var button = $("<button></button>").text("EXPORT");
      $(button).attr("id","import-export-button");

      $(button).appendTo(a);

      $(a).appendTo("#import-export-container");

      var button = $("<button></button>").text("CLOSE");
      $(button).attr("id","import-export-close-button");
      $(button).appendTo("#import-export-container");

      $( "#import-export-close-button" ).click(function() {
        //clean export and hide box.
        $("#import-export-container").find('a').remove();
        $("#import-export-button").remove();
        $("#import-export-close-button").remove();
        $("#import-export-container").hide();
      });

    };

  });

  //LEAVE LISTENER
  $(window).on('beforeunload', function() {
    return "Do you really want to leave now?";
  });



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
  document.getElementById("copylists-button").style.backgroundColor="rgb(2, 117, 216)";
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
  document.getElementById("wordbyword-button").style.backgroundColor="rgb(2, 117, 216)";
  document.getElementById("copylists-button").style.backgroundColor="white";
  document.getElementById("wordbyword-button").style.color="white";
  document.getElementById("copylists-button").style.color="black";
};

/*******************************************************
IMPORT EXPORT FUNCTONS
*******************************************************/

function getCSVexport() {
  creactetheWords();
  var string = "";
  for (var i = 0; i < theWords.length; i++) {
    string = string + theWords[i].first;
    string = string + ","
    string = string + theWords[i].second;
    string = string + "\n"
  };
  return(string);
};

function importCSV(csv) {

  document.getElementById("copylists-button").click();

  var tmp1 = csv.split("\n");
  var list1 = "";
  var list2 = "";

  //sets languages from first row

  if (tmp1.length > 0) {

    var tmp2 = tmp1[0].split(",");

    if (tmp2.length > 0) {
      var e = document.getElementsByClassName("selected_lang-menu");
      e[0].lang = tmp2[0];
      e[1].lang = tmp2[1];
      document.getElementsByName("first-language")[0].value = tmp2[0];
      document.getElementsByName("second-language")[0].value = tmp2[1];;
    }

    for (var i = 1; i < tmp1.length; i++) {
      var tmp2 = tmp1[i].split(",");
      if (tmp2.length > 1) {
      list1 = list1 + tmp2[0] + "\n";
      list2 = list2 + tmp2[1] + "\n";
      }
    }

    var e = document.getElementsByClassName("wordlist-area-input");
    e[0].value = list1;
    e[1].value = list2;
  }
}

/*******************************************************
QUIZZ FUNCTIONS
*******************************************************/

function creactetheWords() {

  var firstlanguage = document.getElementsByName("first-language")[0].value;
  var secondlanguage =  document.getElementsByName("second-language")[0].value;
  var a = document.getElementsByClassName("wordlist-area-input")[0];

  theWords = new Array(); // clear the words

  //first in theWords object keeps track of languages
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
    for (var i = 0; i < a.length; i++) {
      lines[i] = new Array();
      var txtBox = a[i];
      var linestmp1 = txtBox.value.split("\n");
      for (var x = 0; x < linestmp1.length; x++) {
        var linestmp2 = linestmp1[x].split(",");
        for (var y = 0; y < linestmp2.length; y++) {
          lines[i].push(linestmp2[y]);
        };
      };     
    };

    for (var i = 0; i < lines[0].length; i++) {
      if ((lines[0][i] != "") && (lines[1][i] != "")) { //removes blank entries. for instance if booth coma and line break is used between two words
        thisWord = new Object();
        thisWord.first = lines[0][i];
        thisWord.second = lines[1][i];
        thisWord.correct = 0;
        thisWord.mistakes = 0;

        theWords.push(thisWord);
      };
    };


    
  };
};



function initiateQuiz() {
  
  creactetheWords();

  //theWords array of objects created containing word list.

  //Hiding the start page elements and moving on to initialize the desired quiz.
  //Only one quiz type is available but separating the functions and container elements makes it easier to add more if desired later.

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

    //first check if there are still words that haven't been answered correct
    var flag = false;
    for (var i = 1; i < theWords.length; i++) { //skips the first word cause it contains the active languages
      if (theWords[i].correct > 0) {
        flag = true;
      };
    };
    var found = false;
    var foundnumber = -1;
    for (var i = 1; found == false && i<theWords.length+50; i++) { //finds a random word with zero correct answers. breaks if not found on words+50 and simply picks the first in the array instead with zero correct
      var rand = random(1,theWords.length-1); //generates random variable between 1 and the amount of words excluding the language setting
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

    if (found == true) { //if find word sequence failed all words have been answered correct. go to finals and break quiz

    var t = document.createTextNode(theWords[foundnumber].first);
    var p = document.createElement("p");
    p.className = "the-question";
    p.appendChild(t);
    document.getElementById("quiz-question").appendChild(p);

    var input = document.createElement("input");
    input.className = "quiz-answer";
    input.id = "the-quiz-answer";
    input.type = "text";
    input.placeholder = "Type your answer";
    document.getElementById("quiz-answer").appendChild(input);

    var div = document.createElement("div")
    div.className = "block-clear";
    document.getElementById("quiz-answer").appendChild(div);

    var t = document.createTextNode("Answer");
    var button = document.createElement("button");
    button.id = "quiz-answer-button";
    button.appendChild(t);
    button.addEventListener('click', function(){
        this.parentNode.removeChild(this); //first remove answer button once clicked
        document.getElementById("the-quiz-answer").disabled = true //locks the answer box
        if (checkAnswer(foundnumber) == true) {
          var div = document.createElement("div")
          div.className = "block-clear";
          document.getElementById("quiz-answer").appendChild(div);
          var t = document.createTextNode("Correct! Click for next.");
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
          var t = document.createTextNode("Sorry wrong! Click for next.");
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
    var span = document.createElement("span");
    span.className = "lang-lg";
    span.lang = theWords[0].first;
    td.appendChild(span);
    tr.appendChild(td);
    var td = document.createElement("td");
    var span = document.createElement("span");
    span.className = "lang-lg";
    span.lang = theWords[0].second;
    td.appendChild(span);
    tr.appendChild(td);
    var td = document.createElement("td");
    var t = document.createTextNode("Mistakes");
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
      quizErazer(); 
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