

class Factors{
  constructor(){
    this.one = []
    this.two = []
    this.perfect = []
  }

}

var global = false
var ranOnce = false


const comon = (num1, num2) =>{
  if (global === false){
    return
  }
  const num1Factors = new Factors()
  var guess = 1
  var loopCounter = 0
  while(guess < num1/2){
    if(num1 % guess === 0){
      num1Factors.one.push(guess)
      num1Factors.two.push(num1/guess)
    }
    guess++
    if(loopCounter === 100){break}
  }

  

  for(let i=0; i<num1Factors.one.length; i++){
    if(num1Factors.one[i] + num1Factors.two[i] == num2){
      num1Factors.perfect.push(`${num1Factors.one[i]} & ${num1Factors.two[i]}`)
    }
  }
  debugger
  ranOnce = true
  return num1Factors.perfect

}




function App() {
  debugger


  var num1 = window.prompt("Find two numbers that multiply to")
  var num2 = window.prompt("And that add to")
  
  global = true
  var okay
  if(ranOnce === false){
    okay = comon(num1, num2)
  } 

  const perfect = okay || "this happened"
  

  return(
    <div className="App">
      <h1>{perfect}</h1>
    </div>
  );
}

export default App;
