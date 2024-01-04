export function findOutlier(numbers) {
  /* 
  parameters: int array (numbers)
  return: int (outlier number)
  */
  let evenNumbers = []
  let oddNumbers = []

  numbers.forEach(item => {
    if (item % 2 === 0) {
      evenNumbers.push(item)
    } else {
      oddNumbers.push(item)
    }
  })

  if (evenNumbers.length < oddNumbers.length) {
    return evenNumbers[0]
  } else {
    return oddNumbers[0]
  }
}
