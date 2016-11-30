/**
 * By Håkan K Arnoldson
 * https://github.com/hkarn/HTML-CSS-JS-Webstandards-final-YHJUST16
 */

/**
 * The assignment required some things to be done using jQuery. jQuery is used for the import/export elements as well as the advertisement
 * The jQuery should be first in the appropriate sections.
 */

/**
 * When the size of the window is changed this function checks if the css rule to change the color on advertisement has changed.
 * It is better to use a media query to check for size changes, then to check the size directly inside the script. 
 * Because they can behave differently and create extra breakpoints.
 * The reason to do any of this with jQuery and not all in CSS is display: none can make any fade out transition not show with just CSS and keyframes.
 */

/*******************************************************
STYLING FUNCTONS
*******************************************************/

function checkSize() {

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

  /** Fades in advertisement if window is wide enough */
  if ($('#right-advertisment').css('color') == 'rgb(255, 255, 255)' ){
    $('#right-advertisment').fadeIn(6000);
    };
  $(window).resize(checkSize); //adds listener on resize to handle advertisement


  /** Listener opens the IMPORT window */
  $("#menu-import").on("click", function(e) {
    e.preventDefault();
    e.stopPropagation();

    if ( $("#import-export-container").css("display") == "none" ) {   //check if window is already open
      $("#import-export-container").show();
      $("#menu-import").css("color", "#fff");                         //sets import button white
      var button = $("<button></button>").text("IMPORT");
      $(button).attr("id","import-export-button");
      $(button).appendTo("#import-export-container");                 //import button is added

      $( "#import-export-button" ).click(function() {                 //listener on the import button executes importCSV function sending textarea contents.
        importCSV($("textarea#import-export-text").val());
      });

      drawExpImpCloseButton();
      $( "#import-export-close-button" ).click(function() {
        closeImportExport();
      });
    } else {
      closeImportExport(); //closes the window if it is already open allowing the import export buttons to work as toggles.
    };
  });


  /** Listener opens the EXPORT window */
  $("#menu-export").on("click", function(e) {
    e.preventDefault();
    e.stopPropagation();

    if ( $("#import-export-container").css("display") == "none" ) {     //check if window is already open
      $("#menu-export").css("color", "#fff");                           //sets export button white
      $("#import-export-container").show();
      var csvexport = getCSVexport();                                   //getCSVexport returns the finished csv from the contents of the word input fields or textareas
      $("textarea#import-export-text").val(csvexport);                  //writes the csv to the export textarea

      var a = document.createElement('a');                              //creates and anchor element with a download link to the csv
      with (a) {
        href='data:text/csv;charset=utf-8,' + '\uFEFF' + encodeURIComponent(csvexport); //\uFEFF makes excel and calc recognize the UTF8, encodeURIComponent() method encodes the string properly.
        download='wordsfile.csv';
      };
      var button = $("<button></button>").text("EXPORT");
      $(button).attr("id","import-export-button");
      $(button).appendTo(a);                                    //the EXPORT button is appended to show inside the download anchor
      $(a).appendTo("#import-export-container");                //download anchor is drawn on page
      
      drawExpImpCloseButton();
      $( "#import-export-close-button" ).click(function() {
        closeImportExport();
      });
    } else {
      closeImportExport();            //closes the window if it is already open allowing the import export buttons to work as toggles.
    };
  });

  /** 
  * LEAVE LISTENER
  * This one can be pretty annoying but so can accidentally clicking an outbound link after entering 100 word pairs that haven't been exported.
  */
  $(window).on('beforeunload', function() {
    return "Do you really want to leave now?";
  });



  /**
   * Language list listener
   * places listeners that execute selectLang() on click on all the languages in the language selection menus.
   */

  var a = document.getElementsByClassName("language-list");
  for(var i = 0; i < a.length; i++){
    var b = a[i].getElementsByTagName('li');
    for(var j = 0; j < b.length; j++){
      b[j].addEventListener('click', function(){
        selectLang(this.lang,this.parentNode.parentNode);    //sends the lang value of the element and also the position of which dropup lang meny it is for it to work. 
                                                             //here the lang can be extracted from position but on drag and drop it cant
       });
    };
  };


  /**
   * Listeners for
   * Drag & Drop hidden feature
   */

  var a = document.getElementsByClassName("selected_lang-menu");
  for(var i = 0; i < a.length; i++){
    a[i].parentNode.addEventListener('dragover', function(e){          //prevents default on dragover to language selector
      e.preventDefault();
    });
    a[i].parentNode.addEventListener('drop', function(e){              //send the transfered data: the language and the dropup div where the flag was dropped
      selectLang(e.dataTransfer.getData("lang"),this.parentNode);
    });
  };

  /** places dragstart listener on every flag in the bar */
  var a = document.getElementById("main-header-flags").getElementsByTagName("div")[0].getElementsByTagName("span");
  for(var i = 0; i < a.length; i++){
    a[i].addEventListener('dragstart', function(e){
      e.dataTransfer.setData("lang", this.lang);        //sends data with drag the lang value for the span that is the flag
    });
  };


  /**
   * Word input type selector
   * Places the listeners that shows textarea or input boxes for the words
   */
  var a = document.getElementById("wordbyword-button");   //word for word
  a.addEventListener('click', function(){
         showWordbyword();
       });

  var a = document.getElementById("copylists-button");    //textarea
  a.addEventListener('click', function(){
         showTextarea();
       });

  /**
   * Add word lines in word by word input 
   * Adds more lines for words
   */
  var a = document.getElementsByClassName("addline-button");
  for(var i = 0; i < a.length; i++){                            //in booth columns
    a[i].addEventListener('click', function(){
         addLine();
       });
  };

  /* Start quiz 
   * Listener for the start quiz button
   */
  var a = document.getElementById("start-quiz-button");
  a.addEventListener('click', function(){
         initiateQuiz();
       });
};



/*******************************************************
GLOBAL
*******************************************************/

theWords = new Array();   
/** array that will be filled with the word objects
 * each object in the array will contain
 * first = word in first language
 * second = word in second language
 * correct = number of times the word has been answered correctly
 * mistakes = number of time the word has been answered wrong
 *
 * Except the [0] object in the list where first is the first language in short form, second the second language in short form
 * and correct and mistakes are set to -1
 */



/*******************************************************
INPUT VIEW FUNCTIONS
*******************************************************/

/**
 * Function changes the selected item in the language list drop up it also
 * stores the selected value in a hidden input for easier use
 * There is a lot of navigation here rather then ids for it too work in either menu
 * language is language abbreviation
 * position is the .btn-group .dropup menu for language
 */
function selectLang(language,position) {
  var b = position.getElementsByTagName('button')[0].getElementsByTagName('span')[0];
  b.setAttribute('lang', language);                                             //after some navigation sets the lang attribute of the span that shows when drop up is closed
  var c = position.getElementsByTagName('input')[0];
  c.setAttribute('value', language);                                            //stores the selected value in a hidden input
};


/** 
 * Function adds more lines in the word by word input view 
 * Creates a new li inside booth ol elements
 * li contains an input element of type text with classname a-word
 */
function addLine() {
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


/** Shows textarea word input view and changes color of selected active choice button */
function showTextarea() {
  var a = document.getElementsByClassName("wordlist-area-input");
  var b = document.getElementsByClassName("wordlist-lines-input");
  for(var i = 0; i < a.length; i++){
    a[i].style.display="inline-block";  //shows all a
    b[i].style.display="none";          //hides all b
  };
  /** swap button colours */
  document.getElementById("wordbyword-button").style.backgroundColor="white";
  document.getElementById("copylists-button").style.backgroundColor="rgb(2, 117, 216)";
  document.getElementById("wordbyword-button").style.color="black";
  document.getElementById("copylists-button").style.color="white";
};


/** Shows word by word input style and changes color of selected active choice button */
function showWordbyword() {
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

/** This function creates the CLOSE button in the Import/Export view */
function drawExpImpCloseButton() {
  var button = $("<button></button>").text("CLOSE");
  $(button).attr("id","import-export-close-button");
  $(button).appendTo("#import-export-container");
};


/** This function closes the Import/Export box and destroys the created DOM-elements so they can be re-created. */
function closeImportExport(x) {
  $("#import-export-container").find('a').remove();
  $("#import-export-button").remove();
  $("#import-export-close-button").remove();
  $("#import-export-container").hide();
  //reset boot import and export main nav item. probably easier to just do booth then to check which window was closed. since booth buttons can toggle each-other.
  $("#menu-export").css("color", "");
  $("#menu-import").css("color", "");
};


/** Reads theWords and puts them into comma separated string that is returned */
function getCSVexport() {
  creactetheWords();  //theWord is rebuilt from the inputs or textareas
  var string = "";
  for (var i = 0; i < theWords.length; i++) {
    string = string + theWords[i].first;          //first word
    string = string + ","                         //coma
    string = string + theWords[i].second;         //second word
    string = string + "\n"                        //new line
  };                                              //repeat
  return(string);
};


/** Reads string that comes from import text area and outputs it as two separate lists in the words textareas */
function importCSV(csv) {
  document.getElementById("copylists-button").click();      //changes to textareas word input mode by clicking the button

  var tmp1 = csv.split("\n");         //creates one array with each line from the import
  var list1 = "";                     //declares the first list to be created
  var list2 = "";                     //declares the second list to be created

  if (tmp1.length > 0) {                                                    //if there was contents
    var tmp2 = tmp1[0].split(",");                                          //splits the first line on the comma. the first line should contain the languages used in short form
    if (tmp2.length > 0) {                                                  //checking if we got something to avoid errors, this will find two "" if the line has only a coma
      var e = document.getElementsByClassName("selected_lang-menu");        //we want the imported language to show in the language selection dropups 
      e[0].lang = tmp2[0];                                                  //sets first language in the dropup
      e[1].lang = tmp2[1];                                                  //sets second language in the dropup
      document.getElementsByName("first-language")[0].value = tmp2[0];      //sets value of the hidden input
      document.getElementsByName("second-language")[0].value = tmp2[1];     //sets value of the hidden input
    };

    for (var i = 1; i < tmp1.length; i++) {                                 //we need to read the rest of the import starting from the second line
      var tmp2 = tmp1[i].split(",");                                        //split the current line on coma
      if (tmp2.length > 1) {                                                //if there was smt in the current line
      list1 = list1 + tmp2[0] + "\n";                                       //append what is before the first coma on the line to list1 and newline
      list2 = list2 + tmp2[1] + "\n";                                       //append what is after the first coma (and before any possible second coma) on the line to list2 and newline
      };                                                                    //if a line for some reason should have more then one coma anything after the second coma will be discarded
    };

    var e = document.getElementsByClassName("wordlist-area-input");         //writes the lists to the corresponding textareas
    e[0].value = list1;
    e[1].value = list2;
  }
}



/*******************************************************
QUIZZ FUNCTIONS
*******************************************************/

/**
 *  Function for building theWords array. Filling it with objects from the selected input mode.
 */
function creactetheWords() {

  var firstlanguage = document.getElementsByName("first-language")[0].value;            //checks first language from the hidden input
  var secondlanguage =  document.getElementsByName("second-language")[0].value;         //checks second language from the hidden input
  var a = document.getElementsByClassName("wordlist-area-input")[0];                    //stores the first language textarea to be able to run tests on it to determine the state of the page            

  theWords = new Array(); // clears the array

  /** First in theWords object keeps track of languages */
  thisWord = new Object();
  thisWord.first = firstlanguage;
  thisWord.second = secondlanguage;
  thisWord.correct = -1;
  thisWord.mistakes = -1;
  theWords[0] = thisWord;

  if (window.getComputedStyle(a, null).getPropertyValue("display") == "none") {                   //getComputedStyle finds out the css property as currently displayed to the user
    /** Textarea is hidden for the user. Read from word by word input mode */
    var a = document.getElementsByClassName("wordlist-lines-thelines")[0].getElementsByClassName("a-word");     //stores the inputs in the first ol as a
    var b = document.getElementsByClassName("wordlist-lines-thelines")[1].getElementsByClassName("a-word");     //stores the inputs in the second ol as b
    for (var i = 0; i < a.length; i++) {                  //the lists will be equal in length so a or b doesn't matter. since there is only a few lines of codes in one place that changes the length of the ol having a fail check here to prevent it from going out of bounds seemed unnecessary
      if ((a[i].value != "") && (b[i].value != "")) {     //removes blanks
        thisWord = new Object();
        thisWord.first = a[i].value;
        thisWord.second = b[i].value;
        thisWord.correct = 0;
        thisWord.mistakes = 0;
        theWords.push(thisWord);
      };
    };

  } else {
    /** Textarea is shown to the user. Read from it */
    var a = document.getElementsByClassName("wordlist-area-input");
    var lines = new Array();                                    //lines will be the sorted out multidimensional array we will build theWords from later
    for (var i = 0; i < a.length; i++) {                        //run the code below 2 times (for each textarea list)
      lines[i] = new Array();                                   //the first dimension of the array determines if it is first or second language
      var linestmp1 = a[i].value.split("\n");                   //current textbox content -> array with each line as item
      for (var x = 0; x < linestmp1.length; x++) {              //iterate over the newlines
        var linestmp2 = linestmp1[x].split(",");                //split again on coma (the code can take either newline or coma or booth as word separators)
        for (var y = 0; y < linestmp2.length; y++) {            //iterate over the latest split strings
          lines[i].push(linestmp2[y]);
        };
      };
    };

    for (var i = 0; i < lines[0].length; i++) {
      if ((lines[0][i] != "") && (lines[1][i] != "")) {       //removes blank entries. for instance if booth coma and line break is used between two words
        thisWord = new Object();                              
        thisWord.first = lines[0][i];                         //iterate over first language list
        thisWord.second = lines[1][i];                        //iterate over second language list
        thisWord.correct = 0;
        thisWord.mistakes = 0;
        theWords.push(thisWord);                              //adds thisWord object to the array
      };
    };
  };
};


/** Function for starting the quiz sequence */
function initiateQuiz() {
  creactetheWords();                                                  //build theWord array
  if (theWords.length > 1) {                                                  //if there are words else tell the user to input some         
  document.getElementById("start-view-container").style.display = "none";     //hide input word view
  document.getElementById("quiz-view-container").style.display = "block";     //show quiz view
  quiz(1);                                                                    //launches quiz of type 1.
  //only one type of quiz exists for now, could read this number from a selector instead if more are added
  } else {
    var t = document.createTextNode("Please input some words first!");
    var p = document.createElement("p");
    p.style.padding = "12px";
    p.style.fontSize = "1.3em";
    p.style.color = "red";
    p.appendChild(t);                                                           //words are needed!
    document.getElementById("start-quiz-button").parentNode.appendChild(p);
    setTimeout(function(){                                                      //shows the p telling words are needed for 2000 seconds then remove
      document.getElementById("start-quiz-button").parentNode.removeChild(p);
    },2200);
  };
};


/** Random number function - generates and returns a random number from and including min to and including max. Taken from the random number guess game project */
function random(min,max) {
  return (Math.floor(Math.random() * (parseInt(max,10) - parseInt(min,10) + 1)) + parseInt(min,10));
};


/** 
 * Checks the answer. Could later take a second variable for quiz type if other types of tests are necessary 
 * If the foreign word at index foundnumber equals the string in the answer box correct++ else mistake ++
 * Also returns if the answer is true or false 
 */
function checkAnswer(foundnumber) {
  if (theWords[foundnumber].second == document.getElementById("the-quiz-answer").value) {
    theWords[foundnumber].correct++;
    return true;
  } else {
    theWords[foundnumber].mistakes++;
    return false;
  }

};


/** 
 * Eraser function to delete created elements for the quiz question. Could take quiz type as variable later for more quiz types. 
 * Iterates over all the child elements of a set node and removes them. For each node to delete the contents inside.
 */
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


/** 
 * The main quiz function.
 * Takes the type of quiz and uses a switch to execute the right one.
 * This far only one type quiz exists cause it seemed sufficient for the assignment.
 */
function quiz(choice){
  switch(choice) {
  case 1:
    document.getElementById("quiz-view-container").style.display = "block";   //displays the quiz container

    var found = false;                                             //flag goes to true when question has been found (a word that was never answered correct)
    var foundnumber = -1;                                          //declares the foundnumber variable to make sure it exists for later.
    for (var i = 1; found == false && i<theWords.length+50; i++) { //finds a random word with zero correct answers. breaks if not found on words+50 and later simply picks the first in the array instead with zero correct
      var rand = random(1,theWords.length-1);                      //generates random variable between 1 and the amount of words excluding the language setting
      if (theWords[rand].correct < 1) {                            //if the word was never answered correct
        found = true;                                              //found a question
        foundnumber = rand;                                        //saves which question was found
      };
    };
    if (found == false) {                                          //if still no question has been found
      for (var i = 1; i<theWords.length; i++) {                    //iterate over theWords
        if (theWords[i].correct < 1) {                             //the first question without a correct answer found
          found = true;                                            //was found
          foundnumber = i;                                         //save which was found
        };
      };
    };

    if (found == true) {        //if find word sequence still has failed all words have been answered correct. go to finals and break quiz

    /** Our question */
    var t = document.createTextNode(theWords[foundnumber].first);
    var p = document.createElement("p");
    p.className = "the-question";
    p.appendChild(t);
    document.getElementById("quiz-question").appendChild(p);

    /** Our answerbox */
    var input = document.createElement("input");
    input.className = "quiz-answer";
    input.id = "the-quiz-answer";
    input.type = "text";
    input.placeholder = "Type your answer";
    document.getElementById("quiz-answer").appendChild(input);

    /** Some space */
    var div = document.createElement("div")                      
    div.className = "block-clear";
    document.getElementById("quiz-answer").appendChild(div);

    /** Our answer button */
    var t = document.createTextNode("Answer");                   
    var button = document.createElement("button");
    button.id = "quiz-answer-button";
    button.appendChild(t);
    button.addEventListener('click', function(){
        this.parentNode.removeChild(this);                                    //first remove answer button once clicked
        document.getElementById("the-quiz-answer").disabled = true            //locks the answer box
        if (checkAnswer(foundnumber) == true) {                               //if checkAnswer returns true, checkAnswer also logs the result to theWords
          var div = document.createElement("div")                             //some space     
          div.className = "block-clear";
          document.getElementById("quiz-answer").appendChild(div);
          var t = document.createTextNode("Correct! Click for next.");        //Hurray! and add button to move on
          var button = document.createElement("button");
          button.id = "quiz-correct-answer-button";
          button.appendChild(t);
          button.addEventListener('click', function(){                        //Listener to move to next question
            quizErazer();                                                     //The listener deletes the quiz elements and starts the quiz over
            quiz(1);                                                          //Since results are saved in our global array theWords anyway used to start the quiz
          });
          document.getElementById("quiz-answer").appendChild(button);
        } else {                                                              //Boo! that was wrong!
          var div = document.createElement("div")
          div.className = "block-clear";
          document.getElementById("quiz-answer").appendChild(div);
          var t = document.createTextNode("Sorry wrong! Click for next.");    //tell the user he was wrong
          var button = document.createElement("button");
          button.id = "quiz-wrong-answer-button";
          button.appendChild(t);
          button.addEventListener('click', function(){
            quizErazer();                                                       //listener to restart the quiz for another word after wrong
            quiz(1);
          });
          document.getElementById("quiz-answer").appendChild(button);
          var div = document.createElement("div")
          div.className = "block-clear";
          document.getElementById("quiz-answer").appendChild(div);
          var t = document.createTextNode("Correct answer: " + theWords[foundnumber].second);   //Tells the user what the answer should have been
          var p = document.createElement("p");
          p.className = "the-right-answer";
          p.appendChild(t);
          document.getElementById("quiz-answer").appendChild(p);
        };

      });
    document.getElementById("quiz-answer").appendChild(button);     //Appends the button that shows either right or wrong answer and moves on


    } else {

    /** Quiz is complete! Clears the quiz and prints final results and end message */

    quizErazer();                                                                         //first we make sure the slate is clean
    var t = document.createTextNode("You have answered all words correct hurray!");       //congratulate the user
    var p = document.createElement("p");
    p.className = "quiz-finished";
    p.appendChild(t);
    document.getElementById("quiz-answer").appendChild(p);

    var div = document.createElement("div")                                               //add space
    div.className = "block-clear";
    document.getElementById("quiz-answer").appendChild(div);

    var table = document.createElement("table");                                          //creates a table. showing languages, words and the number of mistakes per word.
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

    for (var i = 1; i < theWords.length; i++) {                       //one row per word pair
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

    var div = document.createElement("div");                            //some space
    div.className = "block-clear";
    document.getElementById("quiz-answer").appendChild(div);

    var t = document.createTextNode("Back to start");                   //return button
    var button = document.createElement("button");
    button.id = "quiz-to-start-button";
    button.appendChild(t);
    button.addEventListener('click', function(){                                    //listener to hide quiz view and display input/start view
      quizErazer();
      document.getElementById("quiz-view-container").style.display = "none";
      document.getElementById("start-view-container").style.display = "block";
          });
      document.getElementById("quiz-answer").appendChild(button);
    };
    break;                //end quiz type 1

  default:  //returns to input view if invalid choice of quiz type
    document.getElementById("start-view-container").style.display = "block";
    document.getElementById("quiz-view-container").style.display = "none";
    break;
  };

};