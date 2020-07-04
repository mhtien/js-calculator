# Disco Calculator

Disco Calculator is a calculator written in javascript to satisfy the User Stories outlined in freeCodeCamp's [_Build a Javascript Calculator_][FCC-UserStories]

## The _Disco_ Part

The Disco part appears when any buttons are clicked/pressed on a keyboard. The background colour and font colour of the active button changes by ramdonly assigning a colour from a preset array of hex colours.

This has been created by a combination of internal CSS, external CSS, and Javascript:
* Clicking buttons utilises the psudo CSS class
* Key presses utilisies an _'active'_ class

## The _Calculator_ Part

The Calculator should satisfy the User Stories set in freeSodeCamp's [_Build a Javascript Calculator_][FCC-UserStories]. It heavily uses **if statements** with the occasional while and for loop.

The calculator is made up of two displays - the firstlocated at the top shows the calculation/equation to be calculated, the display directly below shows the buttons pressed and below that are all the calculator buttons

Event listers are created for each button, and each button has two functions called:
1. Show Input Function
2. Change Button Color Function (The Disco Part)

## Future Improvements

The code could have the following improvements:
1. Better balance of refactoring and legibility

The calculator could have the following upgrades:

1. Deleting the previous character from the equation
2. Showing the history of calculations
3. Dealing with large (more than 11?) integers

## Comments/Review

Please let me know if you have any other suggestions! :D


[FCC-UserStories]:https://www.freecodecamp.org/learn/front-end-libraries/front-end-libraries-projects/build-a-javascript-calculator
