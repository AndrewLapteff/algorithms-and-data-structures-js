// Принцип роботи: якщо елемент більший але стоїть ближче до початку
// то він міняється місцями з його меншим сусідом, і так далі
// Таким чином ми на кожній ітерації другого циклу ми виштовшуємо більші елементи
// на одне значення в кінець
// Додавши перевірну на те, чи міняли ми елементи місцями ми буквально перевіряємо
// чи вже відсортований массив чи ні.
// Таким чином ми можемо зекономити послідуючі i*j ітерації

// Time: O(n^2)

const bubbleSort = (arr) => {
  let swapped
  for (let sorted = 0; sorted < arr.length - 1; sorted++) {
    swapped = false
    for (let current = 0; current < arr.length - sorted - 1; current++) {
      if (arr[current] > arr[current + 1]) {
        let temp = arr[current]
        arr[current] = arr[current + 1]
        arr[current + 1] = temp
        swapped = true
      }
    }
    if (!swapped) break
  }
  return arr
}

console.time()
bubbleSort([4, 2, 5, 21, 7, 8, 19])
console.timeEnd()
// без флага ~ 0.120ms
// з флагом  ~ 0.95ms