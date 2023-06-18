// Принцип роботи: на кожній ітерації ділемо массив на 2, обераючи ту сторону де лежить ціль

// Time: O(logn)
// Space: O(1)

const binarySearch = (arr, target) => {
  let left = 0                           // перший індекс массиву
  let right = arr.length - 1             // послідній
  let mid = 0
  while (left <= right) {                // виконувати поки індекси не зайдуть одни за одного
    mid = Math.round((right + left) / 2) // шукаємо середній індекс між мінімальний на максимальним
    if (target == arr[mid]) return mid
    if (target < arr[mid]) {
      right = mid - 1                    // - 1 тому що сама перша умова не спрацювала а отже і не спрацює
    } else {
      left = mid + 1                     // те саме
    }
  }
  return -1
}

let arr = Array.from({ length: 1000 }, (_, idx) => idx)

console.time()
binarySearch(arr, 3) // 0.090ms (8 ітерацій)
console.timeEnd()
