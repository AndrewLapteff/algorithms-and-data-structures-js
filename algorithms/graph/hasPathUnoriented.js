// Неорієнтований граф
// Важливо в такому графі вести облік вершин які буде перевірені, через те що стек не ризиновий
// RangeError: Maximum call stack size exceeded

// метод котрий створює зручний для використання об'єкт:
// вершина: [ зв'язки ]
const buildGraph = (edges) => {
  const graph = {}
  for (let edge of edges) {                 // походимось по всих массивах зв'язків
    const [from, to] = edge
    if (!graph[from]) graph[from] = []      // ініціалізуємо поля для кожної вершини якщо її ще немає в graph
    if (!graph[to]) graph[to] = []          // ініціалізуємо поля для кожної вершини якщо її ще немає в graph
    graph[from].push(to)                    // створюємо двосторонній зв'язок
    graph[to].push(from)                    // створюємо двосторонній зв'язок
  }
  return graph
}

// Time: O(e)
// Space: O(v)

// Метод прохода по графу
const hasPathDFSUndirected = (graph, current, target, visited) => {
  if (current === target) return true
  if (visited.has(current)) return false    // перевірка на те чи перевірена вершина
  visited.add(current)                      // вершина додається в переглянуті 
  for (let neighbour of graph[current]) {
    if (hasPathDFSUndirected(graph, neighbour, target, visited) === true) {
      return true
    }
  }
  return false
}

const edges = [
  ['a', 'b'],
  ['b', 'c'],
  ['f', 'c'],
  ['x', 'y']
]

const undirectedPath = (edges, src, target) => {
  const graph = buildGraph(edges)
  return hasPathDFSUndirected(graph, src, target, new Set()) // екз. сета під переглянуті вершини
}

console.log(undirectedPath(edges, 'a', 'c')) // true
console.log(undirectedPath(edges, 'a', 'x')) // false