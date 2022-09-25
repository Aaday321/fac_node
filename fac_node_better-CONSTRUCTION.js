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
var num1_factors = []

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




const clearLastLine = () => {
    process.stdout.moveCursor(0, -1) // up one line
    process.stdout.clearLine(1) // from cursor to end
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


//          --                 PERFORM CALCULATIONS AND RETURN RESULTS: START                   --            //


const DIVIDE = (number) =>{

  // -- SET UP VARIABLES: START -- //
  var returnableArray = [] //Creates array to capture factor pairs which will be also arrays
  var guess = 1 //Sets the guess to # 1
  var loopCounter = -1 //Sets loop counter to -1 because ...
  var evaluator = num1 //Defualts number used to find factors as num1

  if(num1 < 0){  //<- if num1 is negitive 
    //If you are trying to find a negitive number, make it postive. 
    //You need to do this because we want to always iterate the loop in a postive direction. Changing this value here is eaiser than adding conditional logic to the loop.
    //Remeber, we will add negitive variations of all factos later
    evaluator = num1 * -1 // Makes evaluator a postive version of it's self
  }

  // -- SET UP VARIABLES: END -- //

  //---------------------//

  // -- SPECIAL CASES: START -- //
  if(num1 == 0){//if num1 == 0
    num1_factors.push([num1, num2]) //0 * x = 0. 0 + x  = x > This can skip the entire aglorithm
    return
  } else if (num1 == 1){//if num1 == 0
  //if evalutor is 1 then make it 2. We check the evalutor incase num1 = -1.
  //If we ran 1 throuh the algorithm, we would end up with a fractional evalurator because 1 ÷ 2 + 1 = 1.5
    num1_factors.push([num1, num1]) //1 * 1 = 1. Aside from negitive values, that is the only way to get 1 via multiplication
    return
  }
  // -- SPECIAL CASES: END -- //


  //---------------------//
  

  // -- MAIN DIVISON ALGORITHM: START -- //

  process.stdout.write(`FACTORING ${num1}\n`); //Write to screen

  //Loop from 1 to half of |numb1| + 1
  //If numb1 is 11, we will loop to 6. -I'm not sure if the +1 is nessecary because, an odd number divided by half of it's value plus one will always have a remainder, right? Better safe than sorry so, +1.
  while(guess <= Number(evaluator)/2 + 1){ //Set up loop acording to logic in above notes
      process.stdout.write(`Trying: ${guess} * ${num1/guess}`); //Write to screen
      wait(PROGRAM_SPEED) //Hold for viewing
  
    if(num1 % guess === 0){ //If there is no remained, then we found a group of factors
      num1_factors.push([guess, num1/guess])
      process.stdout.write(`\nADVANCE `) //Write pass to screen
      wait(PROGRAM_SPEED) //Hold for viewing
      process.stdout.write(`\r\x1b[K`) //Move Cursor
      clearLastLine() //Remove line
  
    } else{
      process.stdout.write(`\nFAIL`)//Write Fail to screen
      wait(PROGRAM_SPEED) //Hold for viewing
      process.stdout.write(`\r\x1b[K`) //Move Cursor
      clearLastLine() //Remove line
    }
    guess++ //iterate guess
  }

  //REMOVES THE WORD "Multiplying"
  process.stdout.write(`\r\x1b[K`)//Move Cursor
  clearLastLine()//Remove line

  // -- MAIN DIVISON ALGORITHM: END -- //

  return 

}


const PROCCESS_NUMBERS = (number1,  number2) =>{
  
  //Find factors and store them in a global
  DIVIDE(number1) 

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
  
  //Send out out back to main program & Remove duplicates
  return num1Factors.perfect
}

//          --                 PERFORM CALCULATIONS AND RETURN RESULTS: END                   --            //






//          --                 PROGRAM SET UP AND MAIN OPERATIONS: START                   --            //

//------------------------------------------//

//   --       DISPLAY MATCHES: START 

//Recieves Matches from program and displays them
function displayMatches(matches_array){
  //Displays no matches if the match array is empty
  if(matches_array.length === 0){
    process.stdout.write(`\nNO MATCHES\n\n`); //Write to screen
    return //Jumps out of function
  }

  //Displays all Matches
  process.stdout.write(`\nThe Numbers you are looking for are: \n\n`)// Write to screen
  //Loops through all arrays inside of the match Array - note that the match array is an array of arrays
  for (let i = 0; i < matches_array.length; i++) { //matches_array.length returns that amount of arrays

    //Deals with ordering individual values: Negitve numbers first, Postive Numbers second
    if(matches_array[i][0] > 0 && matches_array[i][1] < 0){zero = 1; one = 0}//Checks if only one value is negative. if the first number is negitive then it reverses the order that they are displayed

      process.stdout.write(`${matches_array[i][zero]} * ${matches_array[i][one]} = ${num1}\n`) //Writes * to screen
      process.stdout.write(`${matches_array[i][zero]} + ${matches_array[i][one]} = ${num2}`) //Writes + to screen
    
    //Writes "OR" if there is more than one set(array) in the matches_array
    if(i !== matches_array.length - 1){ //Checks if this loop is not the last run in the loop. Will not print of last run.
      process.stdout.write(`\n\nOR\n\n`)//Writes "OR"
    }
  }
  process.stdout.write(`\n\n`) //Writes 2 new lines between next output
}

//   --       DISPLAY MATCHES: END

//------------------------------------------//

//   --       COMMANDS: START 
  
//Receieves a command and runs the corisponding function
function isCommand(COMMAND){

  //Switch on the command. If this function returns true, then it tells the program this a command was entered
  switch (COMMAND) {
    case "END": running = true; console.clear(); return true; //Shuts donwn the program, clears console.
    case "CHANGE SPEED": setSpeed(); return true; //Shuts donwn the program, clears console.
    default: return false; //If the input was not a command, return false
  }
}

//   --       COMMANDS: END 

 //------------------------------------------//

//   --       INITAL PROMPTS: START 

//Prompts user for main input and stores responses in valiables
const RUN_PROGRAM = () =>{

  clearGlobal() //Clear Global Variables -Make sure this placement is correct 

  //Takes first input
  num1 = prompt("Find two numbers that multiply to:  ") //Writes to screen AND accepts first input
  if(isCommand(num1)){return} //Checks to see if input is a command. If it is, stop the Function
  num1 = Number(num1)

  //Takes second input
  num2 = prompt("AND that add to:  ") //Writes to screen AND accepts second input
  if(isCommand(num1)){return} //Checks to see if input is a command. If it is, stop the Function
  num2 = Number(num2)

  // Proccesses the input and stores it in a variable called RESULT
  const RESULT = PROCCESS_NUMBERS() //Function operates on global variables so there is no need to pass arugments

  console.clear() //Clears console before displaying res
  displayMatches(RESULT)
}

//   --       INITAL PROMPTS: END 

//------------------------------------------//

//   --       SET PROGRAM SPEED: START 

const setSpeed = () =>{
    //Writes prompt to screen
    PROGRAM_SPEED = prompt("Set the speed you would like the program to run at (in ms): ") //Text output
    //Validates that input is a number above 0
          if(PROGRAM_SPEED * 1 != PROGRAM_SPEED || PROGRAM_SPEED < 0){
              //if either condition is not met, set speed to 7ms
              process.stdout.write("\nDid not recgnoize that number. Speed set to 7ms\n") //Text output
              PROGRAM_SPEED = 7 // Sets defualt speed to 7ms
          }
          //Shows the speed that the program is set to
          process.stdout.write(`\nSPEED SET TO: ${PROGRAM_SPEED}ms\n`)  //Writes speed to screen
          wait(PROMPT_WAITING)//Wait
          console.clear()// Clears console
  }

//   --       SET PROGRAM SPEED: END

//------------------------------------------//

//   --       PROGRAM SET UP: START 

//Sets values and says "hi" on the first go of the program
const first_run = () =>{
  //Program intro screen
  console.clear() // Clears console before program starts
  process.stdout.write("\n\n  Welcome to my program!\n") //Write welcome line
  process.stdout.write("   - Ade :)\n\n") //Writes auther line
  process.stdout.write("\n\n") //Makes new 2 lines between next output

  //Runs the function to set the speed of the program
  setSpeed()

  //This function is to only run once
  firstRun = false
}

//   --       PROGRAM SET UP: END 

//------------------------------------------//

//   --       PROGRAM LOOP: START

//Run the Program
while(running){
  //Sets speed and says "hi" on first run
  if(firstRun){
      first_run()
  }

  RUN_PROGRAM();
}

//   --       PROGRAM LOOP: END

//          --                 PROGRAM SET UP AND MAIN OPERATIONS: END                   --            //