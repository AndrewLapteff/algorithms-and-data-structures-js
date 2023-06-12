// Radix sort - не компоративне, порозрядне сортування котре використовує 
// групування ключів за окремими розрядами числа

// Complexity:

// Кращий	 Середнє	Гірше	 Пам'ять	Стабільний	Додатково
// n * k	 n * k	  n * k	 n + k	  Yes	        k - кількість розрядів в найбільшому числу


// Функція котра додає стільки нулів, скільки не вистачає для корректного ортимання номеру розряду
// 3 -> 003
// тоді повертається значення розряду котрий розглядається на даній ітеріції
const getRadix = (number, radixNumber, radixCount) => {
  return number.toString().padStart(radixCount, '0').toString()[radixNumber]
}

const bucketSort = (input, radixNumber, radixCount) => {
  // створюємо двумірний массив, так звані відра в котрі будуть складась елемент з одинаковим
  // знеченням розряду
  let buckets = Array.from({ length: 10 })
    .fill(0)
    .map(el => [])

  for (let i = 0; i < input.length; i++) {
    // записуємо значення в массив массиву, під тим індексом який дорівнює поточному числу розряду
    buckets[getRadix(input[i], radixNumber, radixCount)].push(input[i])
  }

  let index = 0 // лічильник під вхідний массив 
  // цикл котрий проходить по всих массивах массиву (відрам)
  for (let i = 0; i < buckets.length; i++) {
    // цикл котрий проходить по значенням цих відер, тому що їх може бути кілька
    for (let j = 0; j < buckets[i].length; j++) {
      // сортуємо значення поточного відра, тому що правильний порядок не гарантовано
      buckets[i].sort()
      // затираємо старий порядок значеннь вхідного массиву новим вірним
      input[index] = buckets[i][j]
      index++
    }
  }
}

const radixSort = (array) => {
  // отримуємо найбільше число в массиві, його кількість розрядів і візьмемо
  const radixCount = Math.max(...array).toString().length
  // змінна котра буде зберігати індекси розрядів
  let radixNumber = radixCount - 1
  while (radixNumber >= 0) {
    bucketSort(array, radixNumber, radixCount)
    radixNumber--
  }
  return array
}

console.time()
radixSort([999, 975, 55, 12, 133, 1, 99]) // 0.256ms
console.timeEnd()