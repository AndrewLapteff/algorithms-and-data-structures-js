# Algorithms and data structures in JS

В файлах знаходиться пояснення принципів роботи алгоритмів укріїнською мовою

## Algorithms

##### Array

- [Max value](#max-value-of-array)

##### Graphs

- [Breath first traversal](#breath-first-traversal)
- [Depth first traversal](#depth-first-traversal)
- [Has path](#has-path)
- [Build graph using array](#build-graph-using-array)
- [Has path unoriented](#has-path-unoriented)
- [Connected components count](#connected-components-count)

##### Numbers

- [Is prime](#is-prime)

## Data structures

- [Queue](#queue)

#### Algorithms code

######

###### Max value of array

```javascript
const maxValue = (nums) => {
  let maxVal = -1e7
  nums.forEach((num) => {
    maxVal = num > maxVal ? num : maxVal
  })
  return maxVal
}
```

###### Breath first traversal

```javascript
const breathFirstTraversal = (graph, start) => {
  const queue = new Queue() // here we use custom queue
  queue.enqueue(start)
  while (!queue.isEmpty()) {
    const current = queue.dequeue()
    for (let neighbour of graph[current]) {
      queue.enqueue(neighbour)
    }
  }
}
```

###### Depth first traversal

```javascript
const depthFirstTraversalRecursive = (graph, current) => {
  for (neighbour of graph[current]) {
    depthFirstTraversalRecursive(graph, neighbour)
  }
}
```

###### Has path

```javascript
const hasPathDFS = (graph, src, target) => {
  if (src === target) return true
  for (let neighbour of graph[src]) {
    if (hasPathDFS(graph, neighbour, target) == true) {
      return true
    }
  }
  return false
}
```

###### Build graph using array

```javascript
const buildGraph = (edges) => {
  const graph = {}
  for (let edge of edges) {
    const [from, to] = edge
    if (!graph[from]) graph[from] = []
    if (!graph[to]) graph[to] = []
    graph[from].push(to)
    graph[to].push(from)
  }
  return graph
}

const edges = [
  ['a', 'b'],
  ['b', 'c'],
  ['f', 'c'],
  ['x', 'y'],
]
```

###### Has path unoriented

```javascript
const hasPathDFSUndirected = (graph, current, target, visited) => {
  if (current === target) return true
  if (visited.has(current)) return false
  visited.add(current)
  for (let neighbour of graph[current]) {
    if (hasPathDFSUndirected(graph, neighbour, target, visited) === true) {
      return true
    }
  }
  return false
}

const undirectedPath = (edges, src, target) => {
  const graph = buildGraph(edges) // here we use the previous algorithm
  return hasPathDFSUndirected(graph, src, target, new Set())
}
```

###### Connected components count

```javascript
const explore = (graph, vertex, visited) => {
  if (visited.has(String(vertex))) return false
  visited.add(String(vertex))
  for (let neighbour of graph[vertex]) {
    explore(graph, neighbour, visited)
  }
  return true
}

const connectedComponentsCount = (graph) => {
  let visited = new Set()
  let count = 0
  for (let node in graph) {
    if (explore(graph, node, visited) === true) {
      count++
    }
  }
  return count
}
```

###### Is prime

```javascript
const isPrime = (n) => {
  if (n < 2) return false
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false
  }
  return true
}
```

###### Queue

```javascript
class Queue {
  constructor() {
    this.array = []
    this.front = 0
    this.back = -1
  }
  enqueue(element) {
    this.array.push(element)
    this.back++
  }
  dequeue() {
    if (this.front > this.back) {
      this.front = 0
      this.back = -1
      return undefined
    }
    let element = this.array[this.front]
    delete this.array[this.front]
    this.front++
    return element
  }
  isEmpty() {
    return this.front > this.back
  }
}
```
