const prompt = require("prompt-sync")({ sigint: true });


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
var zero = 0
var one = 1
var ADVANCED_VALUES_COUNTER = 0
var dupCounter= 0
var SELECTED_MODE = "ADDITION MODE"

function clearGlobal(){
  dupCounter= 0
  ADVANCED_VALUES_COUNTER = 0
  zero = 0
  one = 1
  ADVANCED_VALUES = []
  chuncks = []
  fullList = []
  lastChunck = 0
  printed = 0
  allPrinted = false
  firstPrint = true
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
  var loopCounter = -1
  var evaluator = num1
  if(num1 < 0){
      evaluator = num1 * -1
  }
  if(evaluator == 1){
      evaluator = num1 * 2
  }

  //if num1 == 0
  if(num1 == 0){
    object.one.push(num1)
    object.two.push(num2)
    return
  }

  process.stdout.write(`MULTIPLYING\n`); //OUTPUT
  while(guess <= Number(evaluator) + 1){
      process.stdout.write(`Trying: ${guess} * ${num1/guess}`); //OUTPUT
      wait(PROGRAM_SPEED) //HOLD
  
    if(num1 % guess === 0){
      object.one.push(Number(guess))
      object.two.push(Number(num1/guess))
  
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

  


const SHORT_ADD = (input, x) =>{//The addition Test


  //Change all values to numbers
  for (let i = 0; i < input.one.length; i++) {
    input.one[i] = Number(input.one[i])
  }
  for (let i = 0; i < input.two.length; i++) {
    input.two[i] = Number(input.two[i])
  }

  if(x=1)process.stdout.write(`ADDING\n`); //OUTPUT
  for(let i=0; i<input.one.length; i++){
      if(x=1)process.stdout.write(`Trying: ${input.one[i]} + ${input.two[i]}`);
      wait(PROGRAM_SPEED * x)
    if(input.one[i] + input.two[i] == num2){
      input.perfect.push([input.one[i], input.two[i]])


      if(x=1)process.stdout.write(`\nMATCH! `)
      wait(PROGRAM_SPEED * x)
      if(x=1)process.stdout.write(`\r\x1b[K`)
      clearLastLine()
      } else{
          if(x=1)process.stdout.write(`\nFAIL`)
          wait(PROGRAM_SPEED * x)
          if(x=1)process.stdout.write(`\r\x1b[K`)
          clearLastLine()
      }
  }
  if(x=1)process.stdout.write(`\r\x1b[K`)//REMOVES THE WORD "Adding"
  clearLastLine()
}

function collect(array1, array2){
  if(array1.length === 0){return}
  process.stdout.write(`\n`)
 //process.stdout.write(`FOUND: ${array1.length} POTENTIAL MATCHES \n`); //OUTPUT
  for(let i = 0; i<array1.length; i++){
    var expression = expressionMaker(array1[i], array2[i])


    //ADVANCED_VALUES holds:
    //0 the index
    //1 the expression
    //2 the sum
    ADVANCED_VALUES.push([array1.length - i, expression, array1[i]+array2[i]])
    ADVANCED_VALUES_COUNTER++

    
  }
}

const PRINT_MATCHES = (input) =>{
  //Write the expression
  
  var loopCount = 0
  fullList = input

  for (let i = lastChunck; i < lastChunck + 10; i++) {
    loopCount++
   // process.stdout.write(`<<<${i} - ${ADVANCED_VALUES.length}>>>`)
    if(i === ADVANCED_VALUES.length){
      printed = loopCount
      allPrinted = true
      break
    }
    process.stdout.write(`${ADVANCED_VALUES[i][1]}\n`);   
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
  firstPrint = true
  //wait(9999999999)
  
  for(let i=0; i < ADVANCED_VALUES_COUNTER; i++){

    if(i === 0){
      navigate(printed, ADVANCED_VALUES[0][1].length)

    }else{
      navigate(-1,ADVANCED_VALUES[i][1].indexOf("*")-1)
    }
    process.stdout.write(`\r`)
    navigate(0,ADVANCED_VALUES[i][1].length)

    
    process.stdout.write(`<- Adding`)
    wait(SHOW_OFF)
    process.stdout.write(`\r`)
    navigate(0,ADVANCED_VALUES[i][1].indexOf("*")-1)
    process.stdout.write(`+`)
    wait(SHOW_OFF)
    process.stdout.write(`\r`)
    navigate(0,ADVANCED_VALUES[i][1].length)
    process.stdout.write(`= ${ADVANCED_VALUES[i][2]}`)
    

    if(ADVANCED_VALUES[i][2] != num2){
      process.stdout.clearLine(1)
      wait(SHOW_OFF)
      process.stdout.write(`\r`)
      navigate(0,ADVANCED_VALUES[i][1].length + `= ${ADVANCED_VALUES[i][2]}`.length + 1)
      wait(SHOW_OFF) 

      process.stdout.write(`\r`)
      process.stdout.clearLine(1)
    } else{
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

  //console.log(input.length);
  if(input.length < 1){
    return returnableArray
  }
  for(let i = 0; i<input.length; i++){

    

    console.log("loop1");
    for(let ii = 1; ii<input.length; ii++){
      console.log("loop2");
      if(input[i][0] === input[ii][0] || input[i][0] === input[ii][1]){
        dupCounter++
        preReturn[ii][0] = `DUP`
        preReturn[ii][1] = `DUP`
      }
    }
  }

  for(let i = 0; i<preReturn.length; i++){
    if(preReturn[i][0] != `DUP`){
      returnableArray.push(preReturn[i])
    }
  }

  return returnableArray
}

//  - MAIN FUNCTION START -  //

const ADD_MODE_FINDER = () =>{
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
    SHORT_ADD(num1Factors, 0)
    num1Factors.perfect = REMOVE_DUPS(num1Factors.perfect)
    collect(num1Factors.one, num1Factors.two)
    while(!allPrinted){
      PRINT_MATCHES()
      LONG_ADD(num1Factors)
    }
  }else{
    SHORT_ADD(num1Factors, 1)
    num1Factors.perfect = REMOVE_DUPS(num1Factors.perfect)
  }

  //Make new line
  process.stdout.write(`\n`) 

  console.log(num1Factors.perfect)
  //wait(999999999)
  
  //Send out out back to main program & Remove duplicates
  return num1Factors.perfect
}

//  - MAIN FUNCTION END -  //




const factor_ry = (input) =>{

  var number = Number(input)
  var returnableArray = []

  for (let i = 0; i < number + 1; i++) {
    if (number % i == 0) {
      returnableArray.push(i)
      console.log(i);
    }
  }
  console.log(returnableArray);
  return returnableArray

}

const findCommonFactors = (list1, list2) =>{

  //Creating my returnable for later
  var returnableArray = []

  //Set the larger list to use in the loop bellow
  var largerList = []
  var smallerList = []
  if(list1.length >= list2.length){largerList = list1; smallerList = list2
  }else{largerList = list2; smallerList = list1}

  //Find matches
  for (let i = 0; i < largerList.length; i++) {
    for (let ii = 0; ii < smallerList.length; ii++) {
      if(largerList[i] == smallerList[ii]){
        returnableArray.push(largerList[i])
      }
    }
  }

  return returnableArray
}


// ------ FACTOR MODE FUNCTION START ------ //

const FACTOR_MODE_FINDER = () =>{

  

  var factorsOne = factor_ry(num1)
  var factorsTWo = factor_ry(num2)

  return findCommonFactors(factorsOne, factorsTWo)

}

// ------ FACTOR MODE FUNCTION END ------ //
















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
  

function listener(COMMAND){

  switch (COMMAND) {
    case "END": running = false; console.clear(); return false;
    case "CHANGE SPEED": setSpeed(); return false;
    case "SHOW OFF MODE":changeMode(); return false;
    case "FACTOR MODE": SELECTED_MODE = "FACTOR_MODE"; return false;
    case "ADD MODE" : SELECTED_MODE = "ADDITION MODE"; return false;
  
    default: return true;
  }
  
}

function displayMatches(array){
  if(array.length === 0){
    process.stdout.write(`\nNO MATCHES\n\n`);
    return
  }
  process.stdout.write(`\nThe Numbers you are looking for are: \n\n`)
  for (let i = 0; i < array.length; i++) {
    if(array[i][0] > 0 && array[i][1] < 0){zero = 1; one = 0}
    process.stdout.write(`${array[i][zero]} * ${array[i][one]} = ${num1}\n`)
    process.stdout.write(`${array[i][zero]} + ${array[i][one]} = ${num2}`)
    if(i !== array.length - 1){
      process.stdout.write(`\n\nOR\n\n`)
    }
  }
  process.stdout.write(`\n\n`)
}

function displayFactors(array){
  process.stdout.write(`\nThe Numbers you are looking for are: \n\n`)
  console.log(array, "\n");
}

const first_run = () =>{
  console.clear()
  process.stdout.write("\n\n  Welcome to my program!\n")
  process.stdout.write("   - Ade :)\n\n")
  process.stdout.write("          \n\n")

  //process.stdout.write("(Short Add Mode is Active)\n\n")
  setSpeed()

  firstRun = false
}

const ADDIOIN_MODE = () =>{
  num1 = prompt("Find two numbers that multiply to:  ")
  if(listener(num1) === false){return}

  num2 = prompt("AND that add to:  ")
  if(listener(num2) === false){return}

  const RESULT = ADD_MODE_FINDER()

  console.clear()
  displayMatches(RESULT)
}

const FACTOR_MODE = () =>{
  num1 = prompt("Find Common Factors between:  ")
  if(listener(num1) === false){return}else{num1 = Number(num1)}

  num2 = prompt("AND:  ")
  if(listener(num2) === false){return}else{num1 = Number(num1)}

  const RESULT = FACTOR_MODE_FINDER()

  console.clear()
  displayFactors(RESULT)
}

const runMode = (MODE) =>{
  switch (MODE) {
    case "ADDITION MODE" : ADDIOIN_MODE(); break;
    case "FACTOR MODE" : FACTOR_MODE(); break;
    default: break;
  }
}
  
function run(){

  if(firstRun){
      first_run()
  }

  runMode(SELECTED_MODE)

  
  

}
  
while(running){
  run()
}