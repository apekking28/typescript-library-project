function countQueryOccurrences(input: string[], query: string[]): number[] {
    const result: number[] = [];
  
    for (let q of query) {
      let count = 0;
      for (let i of input) {
        if (i === q) {
          count++;
        }
      }
      result.push(count);
    }
  
    return result;
  }
  
  const INPUT = ['xc', 'dz', 'bbb', 'dz'];
  const QUERY = ['bbb', 'ac', 'dz'];
  const OUTPUT = countQueryOccurrences(INPUT, QUERY);
  console.log(OUTPUT); // Output: [1, 0, 2]