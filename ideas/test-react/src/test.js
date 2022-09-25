//const window.prompt = require("window.prompt-sync")({ sigint: true });
//import {getCursorPosition, setCursorPosition, sendCursorEvent, cursorEvents} from "node-cursor";

//const cliProgress = require('cli-progress');

//Global Variables
var firstRun = true
var running = true
var num1
var num2
var PROGRAM_SPEED = 7
const PROMPT_WAITING = 1500
var SHOW_OFF = 200
var LONG_MODE = false
var ADVANCED_VALUES = []
var tryme = 0
var chuncks = []
var fullList = []
var lastChunck = 0
var printed = 0
var allPrinted = false
var firstPrint = true

function clearGlobal(){
  ADVANCED_VALUES = []
  chuncks = []
}


const setSpeed = () =>{
  PROGRAM_SPEED = window.prompt("Set the speed you would like the program to run at (in ms): ")
        if(PROGRAM_SPEED * 1 != PROGRAM_SPEED){
            console.log("\nDid not recgnoize that number. Speed set to 7ms\n")
            PROGRAM_SPEED = 7
        }
        console.log(`\nSPEED SET TO: ${PROGRAM_SPEED}ms\n`)
        wait(PROMPT_WAITING)
        console.clear()
}

const clearLastLine = () => {
    //process.stdout.moveCursor(0, -1) // up one line
    //process.stdout.clearLine(1) // from cursor to end
  }

class Factors{
    constructor(){
      this.one = []
      this.two = []
      this.perfect = []
    }
  
  }

function wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
      now = Date.now();
    }
}

const invertAndAdd = (array, length) =>{
  for(let i=0; i<length; i++){
    array.push(array[i] * -1)
  }
}  





const expressionMaker = (one, two) =>{
  if(one > 0 && two < 0){
    return `${two} * ${one}`
  } else{
    return `${one} * ${two}`
  }
}



const MULTIPLY = (object) =>{

  var guess = 1
  var loopCounter = 0
  var evaluator = num1
  if(num1 < 0){
      evaluator = num1 * -1
  }
  if(evaluator == 1){
      evaluator = num1 * 2
  }

  console.log(`MULTIPLYING\n`); //OUTPUT
  while(guess <= evaluator/2){
      console.log(`Trying: ${guess} * ${num1/guess}`); //OUTPUT
      wait(PROGRAM_SPEED) //HOLD
  
    if(num1 % guess === 0){
      object.one.push(guess)
      object.two.push(num1/guess)
  
      console.log(`\nADVANCE `)
      wait(PROGRAM_SPEED)
      console.log(`\r\x1b[K`)
      clearLastLine()
  
    } else{
      console.log(`\nFAIL`)
      wait(PROGRAM_SPEED)
      console.log(`\r\x1b[K`)
      clearLastLine()
    }
    guess++
    if(loopCounter === 100){
      console.log("over 100")
      break
    }
  }
  console.log(`\r\x1b[K`)//REMOVES THE WORD "Multiplying"
  clearLastLine()
}

  


const SHORT_ADD = (input) =>{//The addition Test
  console.log(`ADDING\n`); //OUTPUT
  for(let i=0; i<input.one.length; i++){
      console.log(`Trying: ${input.one[i]} + ${input.two[i]}`);
      wait(PROGRAM_SPEED)
    if(input.one[i] + input.two[i] == num2){
      input.perfect.push([input.one[i], input.two[i]])


      console.log(`\nMATCH! `)
      wait(PROGRAM_SPEED)
      console.log(`\r\x1b[K`)
      clearLastLine()
      } else{
          console.log(`\nFAIL`)
          wait(PROGRAM_SPEED)
          console.log(`\r\x1b[K`)
          clearLastLine()
      }
  }
  console.log(`\r\x1b[K`)//REMOVES THE WORD "Adding"
  clearLastLine()
}

function collect(array1, array2){
  if(array1.length === 0){return}
  console.log(`FOUND: ${array1.length} POTENTIAL MATCHES \n`); //OUTPUT
  for(let i = 0; i<array1.length; i++){
    var expression = expressionMaker(array1[i], array2[i])


    //ADVANCED_VALUES holds:
    //0 the index
    //1 the expression
    //2 the sum
    ADVANCED_VALUES.push([array1.length - i, expression, array1[i]+array2[i]])

    
  }
}

const PRINT_MATCHES = (input) =>{
  debugger
  //Write the expression
  
  var loopCount = 0
  fullList = input

  for (let i = lastChunck; i < lastChunck + 10; i++) {
    loopCount++
    if(i === ADVANCED_VALUES.length){
      printed = loopCount
      allPrinted = true
      break
    }
    console.log(`${ADVANCED_VALUES[i][1]}\n`);   
  }
  lastChunck += loopCount
  printed = loopCount
  return
}

function navHelper(attempt, place){
  if(attempt < 28){
    navigate(attempt, ADVANCED_VALUES[0][1].length)
    return
  }
  while(attempt < 28){
    chuncks.push(27)
    attempt -= 27
  }
  chuncks.push(attempt)

  for (let i = 0; i < place; i++) {
    navigate(place, ADVANCED_VALUES[0][1].length)
  }
}


const LONG_ADD = (input) =>{
  debugger
  firstPrint = true
  //wait(9999999999)
  
  for(let i=0; i < printed; i++){
    if(i === 0){
      navigate(printed, ADVANCED_VALUES[0][1].length)

    }else{
      navigate(-1,ADVANCED_VALUES[i][1].indexOf("*")-1)
    }
    console.log(`\r`)
    navigate(0,ADVANCED_VALUES[i][1].length)

    
    console.log(`<- Adding`)
    wait(SHOW_OFF)
    console.log(`\r`)
    navigate(0,ADVANCED_VALUES[i][1].indexOf("*")-1)
    console.log(`+`)
    wait(SHOW_OFF)
    console.log(`\r`)
    navigate(0,ADVANCED_VALUES[i][1].length)
    console.log(`= ${ADVANCED_VALUES[i][2]}`)
    

    if(ADVANCED_VALUES[i][2] != num2){
      //process.stdout.clearLine(1)
      wait(SHOW_OFF)
      console.log(`\r`)
      navigate(0,ADVANCED_VALUES[i][1].length + `= ${ADVANCED_VALUES[i][2]}`.length + 1)
      wait(SHOW_OFF) 

      console.log(`\r`)
      //process.stdout.clearLine(1)
    } else{
      input.perfect.push([input.one[i], input.two[i]])
      console.log("  MATCH FOUND");
      wait(SHOW_OFF) 
      console.log(`\r`)
    } 
  }
  console.log(`\n`)
}

function navigate(x, y){
    //process.stdout.moveCursor(y+1, -x)
}
  
//Removes duplicates
const REMOVE_DUPS = (input) =>{

  var preReturn = input
  var returnableArray = []

  console.log(input.length);
  if(input.length < 1){
    return returnableArray
  }
  for(let i = 0; i<input.length; i++){

    

    console.log("loop1");
    for(let ii = 1; ii<input.length; ii++){
      console.log("loop2");
      if(input[i][0] === input[ii][0] || input[i][0] === input[ii][1]){
        preReturn[ii][0] = `DUP`
        preReturn[ii][1] = `DUP`
      }
    }
  }

  for(let i = 0; i<preReturn.length; i++){
    if(preReturn[i][0] != `DUP1`){
      returnableArray.push(preReturn[i])
    }
  }

  return returnableArray
}

//  - MAIN FUNCTION START -  //

const comon = () =>{
  //Clear Global Variables
  clearGlobal() 
  
  // Create Global Variables (Doesn't need to be object probably)
  const num1Factors = new Factors() 

  //Find factors
  MULTIPLY(num1Factors) 

  //Add all negitive values into consideration
  invertAndAdd(num1Factors.one, num1Factors.one.length)
  invertAndAdd(num1Factors.two, num1Factors.two.length)
  
  //Do addition
  if(LONG_MODE){
    collect(num1Factors.one, num1Factors.two)
    while(!allPrinted){
      PRINT_MATCHES()
      LONG_ADD(num1Factors)
    }
  }else{
    SHORT_ADD(num1Factors)
  }

  //Make new line
  console.log(`\n`) 

  console.log(num1Factors.perfect)
  //wait(999999999)
  
  //Send out out back to main program & Remove duplicates
  return REMOVE_DUPS(num1Factors.perfect)
}

//  - MAIN FUNCTION END -  //




function changeMode(){
  if(LONG_MODE){
    LONG_MODE = false
    console.log("SHORT ADD MODE ACTIVATED")
    wait(PROMPT_WAITING)
    console.clear()
  }else{
    LONG_MODE = true
    console.log("LONG ADD MODE ACTIVATED")
    wait(PROMPT_WAITING)
    console.clear()
  }
}
  

function listener(input){
  if(input == "END"){
    running = false
    console.clear()
    return false
  }else if(input == "CHANGE SPEED"){
    setSpeed()
    return false
  } else if(input == "CHANGE MODE"){
    changeMode()
    return false
  }
  
}

function displayMatches(array){
  if(array.length === 0){
    console.log(`\nNO MATCHES\n\n`);
    return
  }
  console.log(`\nThe Numbers you are looking for are: \n\n`)
  for (let i = 0; i < array.length; i++) {
    console.log(`${array[i][0]} * ${array[i][1]} = ${num1}\n`)
    console.log(`${array[i][0]} + ${array[i][1]} = ${num2}`)
    if(i !== array.length - 1){
      console.log(`\n\nOR\n\n`)
    }
  }
  console.log(`\n\n`)
}
  
export function RUN(){
debugger
  if(firstRun){
      console.clear()
      console.log("\n\n  Welcome to my program!\n")
      console.log("   - Ade :)\n\n")
      console.log("          \n\n")

      //console.log("(Short Add Mode is Active)\n\n")
      setSpeed()

      firstRun = false
  }

  num1 = window.prompt("Find two numbers that multiply to:  ")
  if(listener(num1) === false){return}

  num2 = window.prompt("AND that add to:  ")
  if(listener(num2) === false){return}

  const RESULT = comon()

  console.clear()
  displayMatches(RESULT)
  

}
  
