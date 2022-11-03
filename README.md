# ArtProvisation
This repository contains code for "ArtProvisation" project, created at FIT VUT, VIN subject. It allows users to draw Pollock-like images. For user manual, see below. The app uses mainly JavaScript with CSS and HTML. See below for technical details. 

## User manual
User interface is composition of two main parts -- leftside toolbar and the canvas. User can draw random bezier curves to the canvas using tools located at toolbar. 

At the top of toolbar, there are buttons (from left) for uploading new canvas, saving actuall canvas, the undo button and button leading to "about" page. Under this header, there are two main buttons -- one for drawing random curves and one for drawing random dots. Number of drawed curves/dots and its width/size can be changed using 3 sliders under drawing buttons. At the bottom of toolbar, there is tool for changing the background color and color of curves/dots. Results is immediately drawed to canvas. 

If you want to use a photo as background, use the "upload canvas" button and then select your photo. Demo of the app is avaiable at <http://www.stud.fit.vutbr.cz/~xkrist22/artprovisation/>.

## Technical details
Whole app is implemented in JavaScript programming language. App uses basic principles of MVC design pattern. Backend part is realized by `painter` and `stack` classes. Class `painter` implements painting methods and class `stack` implements stack abstract data structure methods and is used for storing history of the canvas. 

Class `app` figures as controller -- it handles gui events, calls methods and reflects result of it. Class has atribute for storing the history of canvas. View is created using HTML markup language with usage of CSS. 

The app was tested using Google chrome and Mozilla Firefox internet browsers. 
