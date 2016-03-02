// JavaScript och Programmeringsmetodik
// Coursework Assignment 1 (CW1)
// Teacher : Jason De Donno
// By: Sandra Filipsson, MWD 2015
// Date: 2016-02-23

//_____________________VARIBLES FOR CAL PAGE_____________________

var outputString = "";                                          // String for outputting answer, when answer and calculation is showing
var outputInt = "";                                             // global for outputting calculation and clicked signs
var i;
var hold = "";                                                  // global varible for the fourth input in textarea
var idCal = getID("one");                                       // returns null if we are in index.html
var idIndex = getID("onClick");                                 // returns null if we are in calculator.html

//_____________________FUNCTIONS FOR INDEX PAGE__________________

if (idIndex !== null) {                                         // if it isn't null, meaning index.html is active
    getID("onClick").onclick = function () {                    // on click on layer onClick
        "use strict";                                           // "use strict"; to return JSLint errors
        var myWindow = window.open("calculator.html", "myWindow", "menubar=no, location=no, resizable=no, scrollbars=no, status=yes, width=280px, height=670px");
        myWindow.moveTo(1500, 0);                                   // moves window to the far right
    };
}

//_____________________FUNCTIONS FOR CAL PAGE____________________

function getID(id) {                                            //function that fetches element of specific id for shorter code.
    "use strict";                                               // "use strict"; to return JSLint errors
    id = document.getElementById(id);
    return id;
}

function toAnArray() {                                          // convert outputString to an array for validation and removal.
    "use strict";                                               // "use strict"; to return JSLint errors
    var outputArray = outputInt.split(" ");                     // splits (by spaces) outputInt to an array. Spaces are only around + - / *
    for (i = 0; i < outputArray.length; i = i + 1) {            // loops the length of the array
        var remove = outputArray.indexOf("");                   // finds the first position in array that has nothing inside.
        if (remove !== -1) {                                    // if found an position in array that has nothing in it.
            outputArray.splice(remove, 1);                      // removes the first found position that is nothing
        }
    }
    return outputArray;                                         // returns the array
}

function kHandler(e) {                                          // function for keys pressed on keypad. (which for firefox)
    "use strict";                                               // "use strict"; to return JSLint errors
    if ((e.keyCode > 47 && e.keyCode < 60) || (e.which > 47 && e.which < 60)) {             // Numbers (0-9) pressed.
        outputInScreen(String.fromCharCode(e.keyCode));
    } else if ((e.keyCode > 95 && e.keyCode < 106) || (e.which > 95 && e.which < 106)) {    // Numbers (0-9) pressed on keypad.
        outputInScreen(String.fromCharCode(e.keyCode - 48));
    } else if (e.keyCode === 8 || e.which === 8) {                                          // backspace pressed.
        backSpace();
    } else if (e.keyCode === 13 || e.which === 13) {                                        // enter pressed.
        calculateAnswer();
    } else if (e.keyCode === 160 || e.which === 160) {                                      // raised to sign pressed.
        outputInScreen(" ^ ");
    } else if (e.keyCode === 106 || e.which === 106) {                                      // multiply sign pressed.
        outputInScreen(" * ");
    } else if (e.keyCode === 107 || e.which === 107) {                                      // plus sign pressed.
        outputInScreen(" + ");
    } else if (e.keyCode === 109 || e.which === 109) {                                      // minus sign pressed.
        outputInScreen(" - ");
    } else if (e.keyCode === 111 || e.which === 111) {                                      // divided sign pressed.
        outputInScreen(" / ");
    } else if (e.keyCode === 190 || e.which === 190 || e.keyCode === 110 || e.which === 110 || e.keyCode === 188 || e.which === 188) {
        outputInScreen(".");                                                                // comma or point pressed.
    }
}
                                                                //function for validation, zeros, points, operands
function validate(y) {
    "use strict";                                               // "use strict"; to return JSLint errors
    var reg = [/([\s][\/\+\-\*\^of]{1,}[\s])$/, /\./, /[\/\+\-\*\^of]{1,}\s$/, /[0-9]/, /[0]$/];
                                                                // reg[0] = space sign space, reg[1] = one point reg[2] = at end(sign+ and 1 space)
    outputInt = outputInt.toString();                           // convert to string for easier validation
    y = y.toString();                                           // convert to string for easier validation
    var arr = toAnArray(), nbr = arr.length - 1;                // converts every input to an array, takes last position in array
    if (reg[0].test(y)) {                                       // if y(input) is a operand
        if ((outputInt === "" || outputInt === "0")) {
            outputInt = "0" + y.toString();
        } else if (!reg[0].test(outputInt)) {
            outputInt = outputInt + y.toString();
        }
    }
    if (reg[1].test(y)) {                                       // if y(input) is a point
        if ((outputInt === "" || outputInt === "0")) {          // if outputInt is a zero or nothing
            outputInt = "0" + y.toString();                     // add zero before point
        } else if (!reg[1].test(outputInt)) {                   // if outputInt doesn't have a point
            outputInt = outputInt + y.toString();               // add point
        } else if (!reg[1].test(arr[nbr])) {                    // if the last position doesn't have a point
            if (reg[2].test(outputInt)) {                           // if outputInt matches sign and space at end of string
                outputInt = outputInt + "0" + y.toString();         // add zero before y(input)
            } else if (!reg[2].test(outputInt)) {                   // if outputInt doesn't matches sign and space at end of string
                outputInt = outputInt + y.toString();               // add outputInt and y(input)
            }
        }
    }
    if (!reg[1].test(y) && !reg[0].test(y)) {                   // if y(input) isn't a point and isn't an operand
        if (outputInt === "0") {                                    // if outputInt is zero 
            outputInt = "";                                         // then removes the zero
            outputInt = outputInt + y.toString();                   // adds variable to outputint
        }
        else if (arr[nbr] === "0" && reg[3].test(y)) {
            outputInt = outputInt.replace(reg[4], "");
            outputInt = outputInt + y.toString();
        } else {                                                    // in other cases than above (outputInt isn't zero)
            outputInt = outputInt + y.toString();                   // add itself and y(input)
        }
    }
}

function addToInt(x, y) {                                      // adding 2 values together or calculation
    "use strict";                                               // "use strict"; to return JSLint errors
    var numb1, numb2;                                           // varibles that exist inside function only for numbers
    if (x !== undefined) {                                      // if x(the array input with numbers to add) isn't undefined
        if (x.length > y) {                                     // if the array is longer than the number of component we need to add values together
            for (i = 0; i < x.length; i = i + 1) {              // loop through arrays length
                x[i].toString();                                    // convert all positions in array to strings
            }
            hold = " " + x[3] + " ";                            // holds operand for adding to calculation later.
            var res = [x.indexOf("+"), x.indexOf("-"), x.indexOf("/"), x.indexOf("*"), x.indexOf("+-"), x.indexOf("^"), x.indexOf("of")];
                                                                // array of index of the signs
            numb1 = Number(x[0]);                               // assign first number value to numb1
            numb2 = Number(x[2]);                               // assign second number value to numb2
            
            if (res[0] === 1) {                                 // if the plus sign is in the second position in x array
                outputInt = numb1 += numb2;                         // adding values together, += instead of +, so js understands it's math
            }
            if (res[1] === 1) {                                 // if the minus sign is in the second position in x array
                outputInt = numb1 -= numb2;                         // adding values together, -= instead of -, so js understands it's math
            }
            if (res[2] === 1) {                                 // if the divided sign is in the second position in x array
                outputInt = numb1 / numb2;                          // adding values together, divided
            }
            if (res[3] === 1) {                                 // if the multiply sign is in the second position in x array
                outputInt = numb1 * numb2;                          // adding values together, multiply
            }
            if (res[4] === 1) {                                 // if the plusminus sign is in the second position in x array
                outputInt = numb1 += -numb2;                        // adding values together, second value become a negative value
            }
            if (res[5] === 1) {                                 // if the raised to sign is in the second position in x array
                outputInt = Math.pow(numb1, numb2);                 // Math method for calculating raised to. (value, amount of times multiplied with itself)
            }
            if (res[6] === 1) {                                 // if the percent sign is in the second position in x array
                outputInt = (numb1 / numb2) * 100;                 // calculates persent numb1 of numb2
            }
        }
    }
}

function outputInScreen(y) {                                            // function for inputing value in outputString
    "use strict";                                                       // "use strict"; to return JSLint errors
    validate(y);                                                        // call function validate, changes outputInt depending on input(y)
    addToInt(toAnArray(), 3);                                           // call function addToInt - adds 2 numbers together inside call toAnArray that...
                                                                        // ...returns an array of outputInt, number of minimum values to add together
    if (hold !== "" && hold !== " undefined " && hold !== null) {       // if hold isn't undefined, nothing or null
        outputString = outputInt.toString();                            // set result of calculation to outputString
        outputInt = outputInt + hold.toString();                        // add holds value to outputInt
        outputString = outputString.fontcolor("#58f258");               //may not work in all browsers
        getID("screentag").innerHTML = outputString + "<br>" + outputInt;  // print(output) in div(id = screen)
        hold = "";                                                      // set hold value to nothing
    } else {                                                            // if hold has a value
        outputInt = outputInt.toString();
        outputInt = outputInt.toString();                               // convert outputInt to string
        getID("screentag").innerHTML = outputInt;                          // print(output) in textarea(id = screen)
    }
}

//_________________________________DELETES FUNCTIONS___________________________________________________

                                                                    // function for removing last character in outputString...
function backSpace() {                                              // ...if it's no characters left, it will be 0.
    "use strict";                                                   // "use strict"; to return JSLint errors
    var reg = /\s$/;                                                // regular expression for a space in the end
    outputInt = outputInt.toString();                               // convert outputInt to an string
    
    if (reg.test(outputInt)) {                                      // if evaluates to be true(outputInt has a space in the end of the string)
        outputInt = outputInt.slice(-outputInt.length, -3);         // removes three last positions in string. for ex. " - "
    } else {                                                        // if evaluates to be false(outputInt has not a space in the end of the string)
        outputInt = outputInt.slice(-outputInt.length, -1);         // removes one last position in string. for ex. "9"
    }
    getID("screentag").innerHTML = outputInt;                          // print in textarea (screen)
    
    if (outputInt === "") {                                         // if outputInt is a string with nothing in it.
        outputInt = "0";                                            // Then set outputInt to be zero.
        getID("screentag").innerHTML = outputInt;                      // print in textarea (screen)
    }
}

function cC() {                                                     // function for removing everything in outputString and replacing with 0.
    "use strict";                                                   // "use strict"; to return JSLint errors
    outputInt = "0";                                                  // removes everything in outputInt an replace with a zero.
    outputString = "0";                                             // removes everything in outputString an replace with a zero.
    getID("screentag").innerHTML = outputInt;                          // print in textarea (screen)
}


function CE() {                                                     // function for removing last hole number entry in outputString.
    "use strict";                                                   // "use strict"; to return JSLint errors
    outputInt = outputInt.toString();                               // for when outputInt is a number, convert to string
    if (outputInt !== "0") {                                        // if outputInt isn't zero
        var exp = /(\d*)$|(\s[\-\+\/\*\^of]{1,2}\s)$|(\d*[\.]\d*)$/;                                                                                                                   //regular exp. for checking end of our expression, either digit(0-...) or 
                                                                    //1 space 1 operator 1 space or digit(0-...) 1 point then digit(0-...) 
        outputInt = outputInt.replace(exp, "");                     // removes the position that matches the reg exp. position
        getID("screentag").innerHTML = outputInt;                      // print in textarea (screen)
    }
    if (outputInt === "") {                                         // if outputInt is nothing, replace with a zero
        getID("screentag").innerHTML = 0;                              // print in textarea (screen)
    }
}

//___________________________________EQUAL BUTTON_________________________________________


function calculateAnswer() {                                    // calculated minimum 3 inputs (for example 3.1(input 1) +(input 2) 0.54(input 3)).
    "use strict";                                               // "use strict"; to return JSLint errors
    addToInt(toAnArray(), 2);                                   // calls function, changes value of global outputInt
    if (isFinite(outputInt)) {                                  // if calculated nbr is a number(string or number)(not NaN, Infinity or -Infinity)
        outputInt = outputInt.toString();                       // convert outputInt to a string instead of number
        getID("screentag").innerHTML = outputInt;                  // print in textarea (screen)    
    } else {                                                    // if calculated nbr isn't a number
        outputInt = "0";
        getID("screentag").innerHTML = outputInt;                  // print zero in textarea
    }

}

//___________________________________EXTRAS BUTTONS_______________________________________

function calSQrt() {                                            // Calculates the square root of x, rounds down the number to 6 decimals.
    "use strict";                                               // "use strict"; to return JSLint errors
    outputInt = Number(outputInt);                              // convert outputInt to a number
    if (!isNaN(outputInt)) {                                    // if not true (meaning not NotaNumber)
        outputInt = Math.sqrt(outputInt);                       // calculates the square root of x
        outputInt = Math.round(outputInt * 10000) / 10000;      // rounds down the number to 5 decimals (depending on zeros)
        getID("screentag").innerHTML = outputInt;               // print in textarea (screen)
    }
}

//______________________EXECUTES ONLY WHEN CALCULATOR.HTML IS OPEN________________________
//_______________________________(from if statement)______________________________________

if (idCal !== null) {                                           // if it isn't null, meaning calculator.html is active only then goes thru the rest of the code
    document.onkeydown = kHandler;                              // while the calculator page is focused the kHandler works.

//___________________________________________ONCLICK FOR BUTTONS__________________________

    getID("one").onclick = function () {                            // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        outputInScreen(1);                                          // calls func. outputInScreen(input) which adds the input to outputInt
    };
    getID("two").onclick = function () {                            // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        outputInScreen(2);                                          // calls func. outputInScreen(input) which adds the input to outputInt
    };
    getID("three").onclick = function () {                          // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        outputInScreen(3);                                          // calls func. outputInScreen(input) which adds the input to outputInt
    };
    getID("four").onclick = function () {                           // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        outputInScreen(4);                                          // calls func. outputInScreen(input) which adds the input to outputInt
    };
    getID("five").onclick = function () {                           // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        outputInScreen(5);                                          // calls func. outputInScreen(input) which adds the input to outputInt
    };
    getID("six").onclick = function () {                            // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        outputInScreen(6);                                          // calls func. outputInScreen(input) which adds the input to outputInt
    };
    getID("seven").onclick = function () {                          // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        outputInScreen(7);                                          // calls func. outputInScreen(input) which adds the input to outputInt
    };
    getID("eight").onclick = function () {                          // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        outputInScreen(8);                                          // calls func. outputInScreen(input) which adds the input to outputInt
    };
    getID("nine").onclick = function () {                           // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        outputInScreen(9);                                          // calls func. outputInScreen(input) which adds the input to outputInt
    };
    getID("zero").onclick = function () {                           // calls func. getID which returns element of specific id, onclick of this element exe. 
        "use strict";                                               // "use strict"; to return JSLint errors
        outputInScreen(0);                                          // calls func. outputInScreen(input) which adds the input to outputInt
    };
    getID("comma").onclick = function () {                          // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        outputInScreen(".");                                        // calls func. outputInScreen(input) which adds the input to outputInt
    };
    getID("plus").onclick = function () {                           // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        outputInScreen(" + ");                                      // calls func. outputInScreen(input) which adds the input to outputInt
    };
    getID("minus").onclick = function () {                          // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        outputInScreen(" - ");                                      // calls func. outputInScreen(input) which adds the input to outputInt
    };
    getID("multiply").onclick = function () {                       // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        outputInScreen(" * ");                                      // calls func. outputInScreen(input) which adds the input to outputInt
    };
    getID("divied").onclick = function () {                         // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        outputInScreen(" / ");                                      // calls func. outputInScreen(input) which adds the input to outputInt
    };
    getID("plusminus").onclick = function () {                      // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        outputInScreen(" +- ");                                     // calls func. outputInScreen(input) which adds the input to outputInt
    };
    getID("backspace").onclick = function () {                      // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        backSpace();                                                // calls function backspace to remove last entry
    };
    getID("C").onclick = function () {                              // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        cC();                                                       // calls func. cC() which removes last whole number entry (for ex. 5 + 58 becomes 5 + )
    };
    getID("CE").onclick = function () {                             // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        CE();                                                       // calls func. cC() which removes last entry(for ex. 5 + 58 becomes 5 + 5)
    };
    getID("equal").onclick = function () {                          // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        calculateAnswer();                                          // calculates answer if there is more than or equal to 3 entrys (for ex. 5 + 0.4)
    };
    getID("sqrt").onclick = function () {                           // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        calSQrt();                                                  // calls function that calculates the square root of the number
    };
    getID("one/x").onclick = function () {                          // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        outputInScreen(" ^ ");                                      // calls func. outputInScreen(input) which adds the input to outputInt
    };
    getID("percent").onclick = function () {                        // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        outputInScreen(" of ");                                      // calls func. outputInScreen(input) which adds the input to outputInt
    };
    getID("round").onclick = function () {                        // calls func. getID which returns element of specific id, onclick of this element exe.
        "use strict";                                               // "use strict"; to return JSLint errors
        var exp = /\s[\-\+\/\*\^of]{1,}\s$/;                        //regular exp. for checking end of our expression            
        if (exp.test(outputInt)) {                                   // checks if there is a sign in the end           
            outputInt = outputInt.replace(exp, "");                  // then remove sign
            outputInt = Math.round(outputInt * 100) / 100;           // round down to 2 decimals
        } else {
            outputInt = Math.round(outputInt * 100) / 100;           // if no sign in end just round down
        }
        getID("screentag").innerHTML = outputInt;                    // print in screentag, textarea
    };
}