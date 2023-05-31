// Алгоритм по пошуку найкоротшого шляху між вершинами

// Принцип роботи: Важливо щоб цей алгоритм використовував BFS так я використовуючи саме цей алгоритм проходу
// ми можемо швидше знайти шукану вершину
// До BFS алгоритму також потрібно додати таку змінну як distance.
// Таку змінну буде мати кожна вершина яку ми вже пройшли. Так як робота алгоритму BFS хвильообразна
// в distance буде записуватись номер ітерації хвилі 

// Time: O(e)
// Space: O(e)

const shortestPath = (graph, from, to) => {
  const visitad = new Set()
  const queue = [[from, 0]]
  while (queue.length > 0) {
    const [vertex, distance] = queue.shift()
    if (visitad.has(vertex)) continue
    visitad.add(vertex)
    if (vertex == to) {
      return distance
    }
    for (let neighbour of graph[vertex]) {
      queue.push([neighbour, distance + 1])
    }
  }
  return -1
}

const graph1 = {
  a: ['b', 'c'],
  b: ['a', 'd'],
  c: ['a', 'e'],
  d: ['b', 'f'],
  e: ['c', 'g'],
  f: ['d', 'j'],
  g: ['e', 'o'],
  j: ['f'],
  o: ['g']
}

console.log(shortestPath(graph1, 'a', 'o')) // 4
console.log(shortestPath(graph1, 'a', 'z')) // -1
