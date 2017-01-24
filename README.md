# Simple vocabulary testing site

## Education assignment at Lernia YH.<br>Final assignment for the first coding course<br>HTML-CSS-JS-Webstandards in YHJUST16

### by Håkan Kindström Arnoldson
  * [LinkedIn](https://www.linkedin.com/in/arnoldson)

Live at <https://arnoldson.online/projects/vocabulary>

### Technologies
  * Bootstrap 3.
  * jQuery.
  * CSS, HTML, JS.
  * Font Awesome.
  * Languages for Bootstrap 3.


### Method
I have used a mobile first design, starting with a simple layout and adding some possible complexity later. I ended up adding the decorative flags, the advertising space and made a more compact display for wide monitors by adding extra empty bootstrap grid boxes on the sides. Though emphasis has been on the scripting inputs and the quizzes more then the design. The project will use a single responsive, interactive page.

### Report

The basic layout and function of the input words stage were done first. There was an issue with adapting the language selector plugin for bootstrap to work inside a form. A solution was found by sending the value to the bootstrap drop-down item and to hidden form field when a selection is made via javascript.

I have prepared for adding more ways of doing the quiz later by using a switch in the function. The quizzes have recursive function calling themselves from a listener sub-function in the quiz function and keep going until the desired state of the array theWords (counting right and wrong answers in each word object) is reached.

The layout switches to a four column grid and adds an advertisement for large screens. This setup with blank margin bootstrap grids is really unnecessary and maybe an afterthought to fulfill the requirement of the page adapting to three screen sizes. I think maybe simply having a one and two column setup in a max-with container would have sufficed.

HTML5 drag and drop function was added as a **hidden feature**. Flag can be dragged from the list at the top and dropped onto either language selector.


### Notes
  * The [bootstrap languages plugin](https://github.com/usrz/bootstrap-languages) has been edited to display "Other language" rather then "Unknown language"
<br><br>

  ![alt text](http://yhguiden.se/files/school/logo/211/download.png "Lernia Logo")
