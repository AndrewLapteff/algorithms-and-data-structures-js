//DFT (depth first traversal) - обходим в глибину, доки не дойдем до вершини котра не має зв'язків (використовуємо Stack)

// Ітеративний варіант
// Worst case
// Time: O(e+v)
// Space: O(v)
const depthFirstTraversal = (graph, source) => {
  const stack = [source]                      // ініціалізуємо стек початковим значенням
  while (stack.length > 0) {                  // цикл буде працювати доки стек не буде пустим
    const current = stack.pop()               // вилучаємо значення зі стеку
    for (let neighbour of graph[current]) {   // проходимось по зв'язкам вершини
      stack.push(neighbour)                   // та пушим її в стек
    }
  }
}

// важливо розуміти що зі стека завжди вилучається посліднє занесене значення, 
// а отже і зв'язок буде браться послідній занесений, що не відбувається в рекурсивному варіанті
// тому результати обходів цих варіантів будуть різниться


// Рекурсивний варінт (вдвічі швидший)
// Worst case
// Time: O(e+v)
// Space: O(v)
const depthFirstTraversalRecursive = (graph, current) => {
  for (neighbour of graph[current]) {
    depthFirstTraversalRecursive(graph, neighbour)
  }
}