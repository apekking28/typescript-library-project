function reverseAlphabet(str: string): string {
    let alphabets: string[] = [];
    let digits: string = '';
  
    
    for (let i = 0; i < str.length; i++) {
      if (isNaN(Number(str[i]))) {
        alphabets.push(str[i]);
      } else {
        digits += str[i];
      }
    }
  
    
    alphabets = alphabets.reverse();
  
   
    const result: string = alphabets.join('') + digits;
  
    return result;
  }
  
  const inputString: string = "NEGIE1";
  const result: string = reverseAlphabet(inputString);
  console.log(result); // output EIGEN1