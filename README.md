# Canvas Project

This project marks the first collaborative project in our bootcamp. The aim was to design and create a canvas drawing app over a week with functionality and user experience in mind. The secondary objective of the project was to practice using github in a group project setting.

## Features include:

* Drawing Lines, Shapes and Eraser 
* Adjusting both outline and fill colours, as well as line width
* Different brush types
* Clear, Save, Undo and Redo
* Ability to reposition shapes before committing them to the canvas
* And a little more...

## How to use:

Our canvas application is fairly straightforward to use. On load, open the box icon and you will find the available tools to draw on the canvas.

By default, the pencil function is selected on load. Icon's reveal a title on hover if the user is unsure of what a button might do.

For the repositioning of shapes, to commit the shape to the canvas, click outside the black outlined box encapsulating the shape to commit it to the canvas. The user can also double click anywhere on the canvas to commit, which comes in useful when the image encompasses the entire canvas area.

## Bugs:

* Opacity function removed as it was causing issues with the behaviour of the undo/redo function. Will need to look into how the opacity values are stored

* Textbox function needs to set the coordinates of where the textbox commits to the canvas. If the user clicks elsewhere on the canvas before committing, the textbox will save where the mousedown occurs.

* A bigger issue with the textbox is that function no longer behaves as intended after the clear function is used. It may be better to remove the function for the time being as the user is forced to reset the canvas for it to work again.