// Принцип роботи: знаходимо найменший елемент в не відсортованій частині массиву
// та замінюємо його з першим елементом ще НЕ відсортованої частини массиву

// Time: O(n^2)

const selectionSort = (arr) => {
  let minIndex, temp
  for (let i = 0; i < arr.length - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}

console.time()
selectionSort([4, 2, 5, 21, 7, 8, 19]) // ~ 0.105ms
console.timeEnd()