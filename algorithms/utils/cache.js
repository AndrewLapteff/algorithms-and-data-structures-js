// Кеш функція має сенс якщо функція яку ми маємо фунцію котра має дуже складну, як результат ресурсоємну логіку
// Даний підхід працює тільки для чистих фунцій, так як аргументи виступають в виді ключів до результатів
// Варто зазначити що цей підхід в замін на зменшення нагрузки на процессор завантажує ОЗУ

function cache (func) {
  const cache = new Map() // сховище для результатів
  return function(x){
    if (cache.has(x)) return cache.get(x) // перевіряємо на наявність результатів для поточного аргументу
    
    const result = func.call(this, x) // якщо результатів ще немає то визиваємо переданий коллбек з контекстом на всякий випадок, передаючи аргументи
    cache.set(x, result) // записуємо результати в Map під ключом аргументу
    return result
  }
} 

// тест функція
function heavyFunction (x) {
  for(let i = 0; i < 100000000; i++){
  }
  return x * 2
}
// використання
heavyFunction = cache(heavyFunction)

console.time()
console.log(heavyFunction(2)) // 41.762ms
console.timeEnd()
console.time()
console.log(heavyFunction(2)) // 0.04ms
console.timeEnd()