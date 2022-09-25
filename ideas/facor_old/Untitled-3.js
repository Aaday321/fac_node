const SHORT_ADD = (input, x) =>{//The addition Test
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