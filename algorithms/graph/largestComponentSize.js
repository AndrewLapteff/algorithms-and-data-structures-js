// Алгоритм кортий повертає кількість вершин зв'язаних в найбільшій компоненті

// Принцип роботи. Ми використовуємо DFS для проходу по графу. 
// В кожному рекурсивному виклику зберігається count який дорівнює 1. 
// Коли ми дійдемо до вершини яка не матиме зв'язків, вона першою поверне 1. 
// Тоді попередній рекурсивний виклик за допомогою оператора += матиме 2 і так далі.
// Отже, exploreSize просто повертає кілікість викликів рекурсії + 1

// Time: O(e+v)
// Space: O(v)

const exploreSize = (graph, vertex, visited) => {
  if (visited.has(vertex)) return 0
  visited.add(vertex)
  let count = 1
  for (neighbour of graph[vertex]) {
    count += exploreSize(graph, neighbour, visited)  // накопичення count
  }
  return count                                       // кожен рекурсивний виклик повертає 1
}                                                    // але корінний виклик поверне кількість цих викликів + 1

const largestComponentSize = (graph) => {
  const visited = new Set()
  let count = 0
  for (let vertex in graph) {                           // проходимось по ключам об'єкту
    const result = exploreSize(graph, vertex, visited)
    if (count < result) count = result
  }
  return count
}

const graph = {
  a: ['c', 'b', 'f'], // 1
  b: ['d'],           // 2
  c: ['e'],           // 3
  d: ['f'],           // 4
  e: [],              // 5
  f: [],              // 6
  g: []
}

console.log(largestComponentSize(graph)) // 6