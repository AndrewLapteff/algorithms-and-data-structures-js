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
- [Largest component size](#largest-component-size)
- [Island count](#island-count)
- [Minimum island count](#minimum-island-count)

##### Sortings

- [Selection sort](#selection-sort)
- [Bubble sort](#bubble-sort)
- [Counting sort](#counting-sort)
- [Quick sort](#quick-sort)
- [Radix sort](#radix-sort)

##### Numbers

- [Is prime](#is-prime)

## Data structures

- [Queue](#queue)
- [Linked List](#linked-list)

#### Algorithms code

######

###### Max value of array

```javascript
const maxValue = (nums) => {
  let maxVal = -Infinity
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

###### Largest component size

```javascript
const exploreSize = (graph, vertex, visited) => {
  if (visited.has(vertex)) return 0
  visited.add(vertex)
  let count = 1
  for (neighbour of graph[vertex]) {
    count += exploreSize(graph, neighbour, visited)
  }
  return count
}

const largestComponentSize = (graph) => {
  const visited = new Set()
  let count = 0
  for (let vertex in graph) {
    const result = exploreSize(graph, vertex, visited)
    if (count < result) count = result
  }
  return count
}
```

###### Island count

```javascript
const explore = (grid, row, col, visited) => {
  const isRowInBounds = 0 <= row && row < grid.length
  const isColInBounds = 0 <= col && col < grid[0].length
  if (!isRowInBounds || !isColInBounds) return false
  if (visited.has(row + ',' + col)) return false
  visited.add(row + ',' + col)
  if (grid[row][col] == 'W') return false
  explore(grid, row - 1, col, visited)
  explore(grid, row + 1, col, visited)
  explore(grid, row, col - 1, visited)
  explore(grid, row, col + 1, visited)
  return true
}

const islandCount = (grid) => {
  const visited = new Set()
  let count = 0
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      count += explore(grid, row, col, visited)
    }
  }
  return count
}
```

###### Minimum island count

```javascript
const explore = (grid, row, col, visited) => {
  const isRowInBounds = 0 <= row && row < grid.length
  const isColInBounds = 0 <= col && col < grid[0].length
  if (!isRowInBounds || !isColInBounds) return 0 // перевірки на те чи не вийшли ми за межі
  if (visited.has(row + ',' + col)) return 0
  visited.add(row + ',' + col)
  if (grid[row][col] == 'W') return 0
  let count = 1
  count += explore(grid, row - 1, col, visited) // вижче
  count += explore(grid, row + 1, col, visited) // нижче
  count += explore(grid, row, col - 1, visited) // лівіше
  count += explore(grid, row, col + 1, visited) // правіше
  return count
}

const mininumIslandCount = (grid) => {
  const visited = new Set()
  let count = Infinity
  let result = 0
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      result = explore(grid, row, col, visited)
      if (result < count && result != 0) count = result
    }
  }
  return count
}
```

###### Selection sort

```javascript
const selectionSort = (arr) => {
  let minIndex, temp
  for (let i = 0; i < arr.length - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}
```

###### Bubble sort

```javascript
const bubbleSort = (arr) => {
  let swapped
  for (let sorted = 0; sorted < arr.length - 1; sorted++) {
    swapped = false
    for (let current = 0; current < arr.length - sorted - 1; current++) {
      if (arr[current] > arr[current + 1]) {
        let temp = arr[current]
        arr[current] = arr[current + 1]
        arr[current + 1] = temp
        swapped = true
      }
    }
    if (!swapped) break
  }
  return arr
}
```

###### Counting sort

```javascript
const countingSort = (input) => {
  const counts = Array(Math.max(...input)).fill(0)
  const output = []
  for (elm of input) {
    counts[elm] = 1
  }
  for (let i = 1; i < counts.length; i++) {
    counts[i] = counts[i] + counts[i - 1]
  }

  for (let i = 0; i < input.length; i++) {
    output[counts[input[i]] - 1] = input[i]
    counts[input[i]]--
  }
  return output
}
```

###### Quick sort

```javascript
const quickSort = (arr) => {
  if (arr.length < 2) return arr
  const pivot = arr[Math.floor(Math.random() * arr.length)]
  const less = arr.filter((val) => val < pivot)
  const greater = arr.filter((val) => val > pivot)
  return [...simpleQuicksort(less), pivot, ...simpleQuicksort(greater)]
}
```

###### Radix sort

```javascript
const getRadix = (number, radixNumber, radixCount) => {
  return number.toString().padStart(radixCount, '0').toString()[radixNumber]
}

const bucketSort = (input, radixNumber, radixCount) => {
  let buckets = Array.from({ length: 10 })
    .fill(0)
    .map((el) => [])

  for (let i = 0; i < input.length; i++) {
    buckets[getRadix(input[i], radixNumber, radixCount)].push(input[i])
  }

  let index = 0
  for (let i = 0; i < buckets.length; i++) {
    for (let j = 0; j < buckets[i].length; j++) {
      buckets[i].sort()
      input[index] = buckets[i][j]
      index++
    }
  }
}

const radixSort = (array) => {
  const radixCount = Math.max(...array).toString().length
  let radixNumber = radixCount - 1
  while (radixNumber >= 0) {
    bucketSort(array, radixNumber, radixCount)
    radixNumber--
  }
  return array
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

###### Linked List

```javascript
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
  head = null
  tail = null
  constructor() {}

  add(value) {
    if (!this.head) {
      this.head = new Node(value)
      this.tail = this.head
      return
    }
    this.tail.next = new Node(value)
    this.tail = this.tail.next
  }

  traversal() {
    let current = this.head
    let list = []
    while (current !== null) {
      list.push(current.value)
      current = current.next
    }
    return list
  }

  delete(value) {
    if (!this.head) return -1
    if (this.head.value == value) {
      this.head = this.head.next
      return
    }

    let current = this.head
    let parent = null
    while (current.value != value && current.next != null) {
      parent = current
      current = current.next
    }

    if (current.value !== value) return -1

    if (current.next) {
      parent.next = current.next
    } else {
      parent.next = null
    }
  }

  find(value) {
    if (!this.head) return false
    if (this.head.value == value) return true

    let current = this.head
    while (current.value != value && current.next != null) {
      current = current.next
    }
    return current.value == value ? true : false
  }
}
```
