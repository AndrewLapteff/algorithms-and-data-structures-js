const Queue = require("../../data_structures/queue")

// BFS (breath first traversal) - обхід хвилями, спочатку обходимо всих сусідів, 
// тоді їх сусідів і так далі (використовуємо Queue)

// Worst case
// Time: O(e+v)
// Space: O(v/2) в середньому під час виконання

const breathFirstTraversal = (graph, start) => {
  // краще використовувати кастомну чергу ніж массив, тому що метод shift працює за O(n)
  const queue = new Queue()
  queue.enqueue(start)                        // ініціалізація
  while (!queue.isEmpty()) {
    const current = queue.dequeue()           // отримуємо перший елемент черги
    for (let neighbour of graph[current]) {
      queue.enqueue(neighbour)                // поміщаємо в кінець черги
    }
  }
}

const graph = {
  a: ['c', 'b'],
  b: ['d'],
  c: ['e'],
  d: ['f'],
  e: [],
  f: [],
  g: []
}

breathFirstTraversal(graph, 'a', 'd')