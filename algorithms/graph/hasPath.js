const Queue = require("../../data_structures/queue")

// Заганом перевірка на існування шляху це звичайний DFS/BFS але з return bool

// DFS
const hasPathDFS = (graph, src, target) => {
  if (src === target) return true                       // на випадок коли початковий елемент і є шуканим
  for (let neighbour of graph[src]) {
    if (hasPathDFS(graph, neighbour, target) == true) { // якщо ми в якійсь вітці рекурсії знайшли елемент
      return true                                       // повертаємо попереднім викликам true
    }
  }
  return false                                          // повертаємо false
}

// BFS
const hasPathBFS = (graph, src, target) => {
  if (src === target) return true
  let queue = new Queue()
  queue.enqueue(src)
  while (!queue.isEmpty()) {
    for (let neighbour of graph[queue.dequeue()])
      if (neighbour) {
        if (neighbour === target) return true
        queue.enqueue(neighbour)
      }
  }
  return false
}