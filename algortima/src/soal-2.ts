function longest(sentence: string): string {
    const words = sentence.split(' ');
    let longestWord = '';
  
    for (let word of words) {
      if (word.length > longestWord.length) {
        longestWord = word;
      }
    }
  
    return `${longestWord}: ${longestWord.length} characters`;
  }
  
  const sentence1 = "Saya sangat senang mengerjakan soal algoritma";
  const longestWordResult = longest(sentence1);
  console.log(longestWordResult); // Output: "mengerjakan: 11 characters"