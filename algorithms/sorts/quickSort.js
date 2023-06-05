// Time: O(n*logn)
// Space: O(logn)

const simpleQuicksort = (arr) => {
  // базовий випадок: якщо ми намагаємось відфільтрувати массив довжиною в один елемент
  if (arr.length < 2) return arr
  // обераємо будь який елемент з массиву для покращення швидкості алгоритму
  const pivot = arr[Math.floor(Math.random() * arr.length)]
  const less = arr.filter(val => val < pivot)  // отримуємо елементи котрі менше ніж наший опорний елемент
  const greater = arr.filter(val => val > pivot) // отримуємо елементи котрі більші ніж наший опорний елемент
  // рекурсивно сортуємо попередні массиви вставляючи між ними опорне значення
  return [...simpleQuicksort(less), pivot, ...simpleQuicksort(greater)]
}
console.time()
const newArr = simpleQuicksort([4, 2, 5, 21, 7, 8, 19]) // ~ 0.135ms
console.timeEnd()
console.log(newArr)
