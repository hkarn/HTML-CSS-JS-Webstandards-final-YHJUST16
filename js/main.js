/*
By Håkan K Arnoldson
https://github.com/hkarn/HTML-CSS-JS-Webstandards-final-YHJUST16
*/

function selectLang(a,b) {
  var id = "selected_lang-menu-" + b;
  document.getElementById(id).setAttribute("lang", a);
}

function addLine(a) {
  var input = document.createElement("input");
  input.type = "text";
  input.className = "a-word";
  document.getElementsByClassName("wordlist-lines-thelines")[0].appendChild(input);
  var input = document.createElement("input");
  input.type = "text";
  input.className = "a-word";
  document.getElementsByClassName("wordlist-lines-thelines")[1].appendChild(input);
}

function showTextarea() {
  document.getElementsByClassName("wordlist-area-input")[0].style.display="inline-block";
  document.getElementsByClassName("wordlist-area-input")[1].style.display="inline-block";
  document.getElementsByClassName("wordlist-lines-input")[0].style.display="none";
  document.getElementsByClassName("wordlist-lines-input")[1].style.display="none";
}

function showWordbyword() {
  document.getElementsByClassName("wordlist-lines-input")[0].style.display="inline-block";
  document.getElementsByClassName("wordlist-lines-input")[1].style.display="inline-block";
  document.getElementsByClassName("wordlist-area-input")[0].style.display="none";
  document.getElementsByClassName("wordlist-area-input")[1].style.display="none";
}