// Просте ковзне середнє - це середнє, отримане на основі даних за деякий період часу t

function simpleMovingAverage(data, n) {
  if (n > data.length) return -1
  let result = 0
  let resultsArr = []

  for (let idx = n; idx < data.length + 1; idx++) {
    let elements = data.slice(idx - n, idx) // отримуємо елементи массиву в певному діапазоні

    // калькулюємо їх суму
    elements.forEach((el) => {
      result += el
    })

    resultsArr.push(result / n)
    result = 0
  }

  return resultsArr
}

console.log(simpleMovingAverage([10, 7, 12, 16, 10, 6, 15, 10, 6, 1], 4))
//                              [11.25, 11.25, 11, 11.75, 10.25, 9.25, 8]
