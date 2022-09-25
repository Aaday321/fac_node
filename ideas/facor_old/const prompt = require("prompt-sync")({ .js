const prompt = require("prompt-sync")({ sigint: true });
//import {getCursorPosition, setCursorPosition, sendCursorEvent, cursorEvents} from "node-cursor";

//const cliProgress = require('cli-progress');

//Global Variables
var firstRun = true
var running = true
var num1
var num2
var PROGRAM_SPEED = 7
const PROMPT_WAITING = 1500
var SHOW_OFF = 300
var LONG_MODE = false
var lineCounter = []
var tryme = 0

function clearGlobal(){
  lineCounter = []
}


const setSpeed = () =>{
  PROGRAM_SPEED = prompt("Set the speed you would like the program to run at (in ms): ")
        if(PROGRAM_SPEED * 1 != PROGRAM_SPEED){
            process.stdout.write("\nDid not recgnoize that number. Speed set to 7ms\n")
            PROGRAM_SPEED = 7
        }
        process.stdout.write(`\nSPEED SET TO: ${PROGRAM_SPEED}ms\n`)
        wait(PROMPT_WAITING)
        console.clear()
}

const clearLastLine = () => {
    process.stdout.moveCursor(0, -1) // up one line
    process.stdout.clearLine(1) // from cursor to end
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

  process.stdout.write(`MULTIPLYING\n`); //OUTPUT
  while(guess <= evaluator/2){
      process.stdout.write(`Trying: ${guess} * ${num1/guess}`); //OUTPUT
      wait(PROGRAM_SPEED) //HOLD
  
    if(num1 % guess === 0){
      object.one.push(guess)
      object.two.push(num1/guess)
  
      process.stdout.write(`\nADVANCE `)
      wait(PROGRAM_SPEED)
      process.stdout.write(`\r\x1b[K`)
      clearLastLine()
  
    } else{
      process.stdout.write(`\nFAIL`)
      wait(PROGRAM_SPEED)
      process.stdout.write(`\r\x1b[K`)
      clearLastLine()
    }
    guess++
    if(loopCounter === 100){
      process.stdout.write("over 100")
      break
    }
  }
  process.stdout.write(`\r\x1b[K`)//REMOVES THE WORD "Multiplying"
  clearLastLine()
}

  


const SHORT_ADD = (input) =>{//The addition Test
  process.stdout.write(`ADDING\n`); //OUTPUT
  for(let i=0; i<input.one.length; i++){
      process.stdout.write(`Trying: ${input.one[i]} + ${input.two[i]}`);
      wait(PROGRAM_SPEED)
    if(input.one[i] + input.two[i] == num2){
      input.perfect.push([input.one[i], input.two[i]])


      process.stdout.write(`\nMATCH! `)
      wait(PROGRAM_SPEED)
      process.stdout.write(`\r\x1b[K`)
      clearLastLine()
      } else{
          process.stdout.write(`\nFAIL`)
          wait(PROGRAM_SPEED)
          process.stdout.write(`\r\x1b[K`)
          clearLastLine()
      }
  }
  process.stdout.write(`\r\x1b[K`)//REMOVES THE WORD "Adding"
  clearLastLine()
}

const PRINT_MATCHES = (array1, array2) =>{

  if(array1.length === 0){return}
  process.stdout.write(`FOUND: ${array1.length} POTENTIAL MATCHES \n`); //OUTPUT
  for(let i = 0; i<input+5; i++){
    var expression = expressionMaker(array1[i], array2[i])
    tryme++
    lineCounter.push([array1.length - i, expression, array1[i]+array2[i]])
    process.stdout.write(`${expression}\n`);
  }
  
}

function navHelper(attempt, place){
  if(attempt < 28){
    navigate(attempt, lineCounter[0][1].length)
    return
  }
  var chuncks = []
  while(attempt < 28){
    chuncks.push(27)
    attempt -= 27
  }
  chuncks.push(attempt)

  for (let i = 0; i < place; i++) {
    navigate(place, lineCounter[0][1].length)
  }
}


const LONG_ADD = (input) =>{
  //wait(9999999999)
  
  for(let i=0; i < lineCounter.length; i++){
    if(i === 0){
      navHelper(lineCounter[i][0])

    }else{
      navigate(-1,lineCounter[i][1].indexOf("*")-1)
    }
    process.stdout.write(`\r`)
    navigate(0,lineCounter[i][1].length)

    
    process.stdout.write(`<- Adding`)
    wait(SHOW_OFF)
    process.stdout.write(`\r`)
    navigate(0,lineCounter[i][1].indexOf("*")-1)
    process.stdout.write(`+`)
    wait(SHOW_OFF)
    process.stdout.write(`\r`)
    navigate(0,lineCounter[i][1].length)
    process.stdout.write(`= ${lineCounter[i][2]}`)
    

    if(lineCounter[i][2] != num2){
      process.stdout.clearLine(1)
      wait(SHOW_OFF)
      process.stdout.write(`\r`)
      navigate(0,lineCounter[i][1].length + `= ${lineCounter[i][2]}`.length + 1)
      wait(SHOW_OFF) 

      process.stdout.write(`\r`)
      process.stdout.clearLine(1)
    } else{
      input.perfect.push([input.one[i], input.two[i]])
      process.stdout.write("  MATCH FOUND");
      wait(SHOW_OFF) 
      process.stdout.write(`\r`)
    } 
  }
  process.stdout.write(`\n`)
}

function navigate(x, y){
    process.stdout.moveCursor(y+1, -x)
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
    PRINT_MATCHES(num1Factors.one, num1Factors.two, 0)
    LONG_ADD(num1Factors)
  }else{
    SHORT_ADD(num1Factors)
  }

  //Make new line
  process.stdout.write(`\n`) 

  console.log(num1Factors.perfect)
  //wait(999999999)
  
  //Send out out back to main program & Remove duplicates
  return REMOVE_DUPS(num1Factors.perfect)
}

//  - MAIN FUNCTION END -  //




function changeMode(){
  if(LONG_MODE){
    LONG_MODE = false
    process.stdout.write("SHORT ADD MODE ACTIVATED")
    wait(PROMPT_WAITING)
    console.clear()
  }else{
    LONG_MODE = true
    process.stdout.write("LONG ADD MODE ACTIVATED")
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
    process.stdout.write(`\nNO MATCHES\n\n`);
    return
  }
  process.stdout.write(`\nThe Numbers you are looking for are: \n\n`)
  for (let i = 0; i < array.length; i++) {
    process.stdout.write(`${array[i][0]} * ${array[i][1]} = ${num1}\n`)
    process.stdout.write(`${array[i][0]} + ${array[i][1]} = ${num2}`)
    if(i !== array.length - 1){
      process.stdout.write(`\n\nOR\n\n`)
    }
  }
  process.stdout.write(`\n\n`)
}
  
function run(){

  if(firstRun){
      console.clear()
      process.stdout.write("\n\n  Welcome to my program!\n")
      process.stdout.write("   - Ade :)\n\n")
      process.stdout.write("          \n\n")

      //process.stdout.write("(Short Add Mode is Active)\n\n")
      setSpeed()

      firstRun = false
  }

  num1 = prompt("Find two numbers that multiply to:  ")
  if(listener(num1) === false){return}

  num2 = prompt("AND that add to:  ")
  if(listener(num2) === false){return}

  const RESULT = comon()

  console.clear()
  displayMatches(RESULT)
  

}
  
while(running){
  run()
}