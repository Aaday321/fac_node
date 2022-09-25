
const LONG_ADD = (input) =>{
    for(let i=0; i < lineCounter.length; i++){
      // process.stdout.write(`${i}`)
      // process.stdout.write(`${lineCounter.length}`)
      if(i === 0){
        navigate(lineCounter[i][0], lineCounter[0][1].length)
      }else{
        navigate(-1,lineCounter[i][1].indexOf("*")-1)
      }
      wait(SHOW_OFF)
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