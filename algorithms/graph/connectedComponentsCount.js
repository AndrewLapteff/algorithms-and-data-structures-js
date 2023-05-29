// Як це працює: коли визивається функція explore, вона починає проходитись по графу. Коли вона пройде всі вершини
// зв'язані з переданою вершиною, то поверне true. Всі пройдені вершини ми записуємо в visited. 
// Тому, коли запускаємо функцію explore з вершиною котра вже була переглянута, функція поверне false.
// Це і забезпечує підрахунок незв'язаних компонентів

const explore = (graph, vertex, visited) => {
  if (visited.has(String(vertex))) return false    // так як в об'єкті ключі це string то і значення ми маємо...
  visited.add(String(vertex))                      // ...додавати з типом string
  for (let neighbour of graph[vertex]) {           // проходимось по всих зв'язках вершини
    explore(graph, neighbour, visited)
  }
  return true                                      // коли цикл завершиться, повертаємо true
}

const connectedComponentsCount = (graph) => {
  let visited = new Set()
  let count = 0
  for (let node in graph) {                        // проходимось по кожній вершині в об'єкті
    if (explore(graph, node, visited) === true) {
      count++
    }
  }
  return count
}

const res = connectedComponentsCount({
  0: [8, 1, 5], // 
  1: [0],       // 1
  5: [0, 8],    //
  8: [0, 5],    //
  2: [3, 4],  //
  3: [2, 4],  // 2
  4: [3, 2]   //
})

console.log(res) // 2 компоненти