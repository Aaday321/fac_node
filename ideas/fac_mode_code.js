
//Factor mode is broken
const FACTOR_MODE = () =>{
    num1 = prompt("Find Common Factors between:  ")
    if(listener(num1) === false){return}else{num1 = Number(num1)}
  
    num2 = prompt("AND:  ")
    if(listener(num2) === false){return}else{num1 = Number(num1)}
  
    const RESULT = FACTOR_MODE_FINDER()
  
    console.clear()
    displayFactors(RESULT)
  }
    