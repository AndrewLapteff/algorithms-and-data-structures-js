# Algorithms and data structures in JS

В файлах знаходиться пояснення принципів роботи алгоритмів укріїнською мовою

## Algorithms

##### Array

- [Max value](#max-value-of-array)

##### Utilities

- [Throttle](#throttle)
- [Debounce](#debounce)
- [Curry](#curry)
- [Cache](#cache)

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

##### Genetic

- [Traveling Salesman Genetic Algorithm](#traveling-salesman-genetic-algorithm)

##### Greedy algorithms

- [Minimize max lateness](#minimize-max-lateness)

##### Sortings

- [Selection sort](#selection-sort)
- [Bubble sort](#bubble-sort)
- [Counting sort](#counting-sort)
- [Quick sort](#quick-sort)
- [Radix sort](#radix-sort)

##### Searches

- [Binary search](#binary-search)

##### Image

- [Binary](#binary)
- [Grayscale](#grayscale)
- [Negative](#negative)

##### Coding

- [Huffman coding](#huffman-coding)

##### Numbers

- [Is prime](#is-prime)

##### Text

- [Jaccard similarity](#jaccard-similarity)

##### Other

- Game of Life
- [Knapsack problem](#knapsack-problem)
- [Simple moving averange](#simple-moving-average)

## Data structures

- [Queue](#queue)
- [Linked list](#linked-list)
- [Binary tree](#binary-tree)

#### BFS vs DFS

- **Data Structure**: BFS uses a queue, whearas DFS uses a stack
- **Speed**: BFS is slow as compared to DFS.
- **Memory**: BFS requires more memory.
- **When to use?**: When the target is close to the source, BFS performs better. When the target is far from the source, DFS is preferable.

#### Algorithms code

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

###### Traveling Salesman Genetic Algorithm

```javascript
class City {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  distanceTo(city) {
    const dx = this.x - city.x
    const dy = this.y - city.y
    return Math.sqrt(dx * dx + dy * dy)
  }
}

class TSPGeneticAlgorithm {
  constructor(numCities, populationSize, mutationRate) {
    this.numCities = numCities
    this.populationSize = populationSize
    this.mutationRate = mutationRate
    this.cities = []
    this.population = []
    this.fitness = []
  }

  initialize() {
    // створюємо массив міст та координати для кожного
    for (let i = 0; i < this.numCities; i++) {
      this.cities.push(new City(Math.random() * 200, Math.random() * 200))
    }

    // створення популяції
    for (let i = 0; i < this.populationSize; i++) {
      // тур - рандомно розставлені міста в массиві
      const tour = this.shuffleArray([...Array(this.numCities).keys()])
      this.population.push(tour)
    }
  }

  evolve() {
    const newPopulation = []
    for (let i = 0; i < this.populationSize; i++) {
      // обераємо найрезультатніших батьків
      const parent1 = this.selectParent()
      const parent2 = this.selectParent()
      // отримуємо дитя зхрещуючи "генетичні стрічки" батьків
      const child = this.crossover(parent1, parent2)
      // мутація генів
      this.mutate(child)
      newPopulation.push(child)
    }
    this.population = newPopulation
  }

  selectParent() {
    // рандомно беремо 5 турів на калькулюємо найкращий
    const tournamentSize = 5
    let bestTour = null
    for (let i = 0; i < tournamentSize; i++) {
      // обераємо рандомний тур
      const randomIndex = Math.floor(Math.random() * this.populationSize)
      const tour = this.population[randomIndex]
      if (
        bestTour === null ||
        this.calculateTourDistance(tour) < this.calculateTourDistance(bestTour)
      ) {
        bestTour = tour
      }
    }
    return bestTour
  }

  crossover(parent1, parent2) {
    // обераємо початок та кінець "генового ланцюжка"
    const start = Math.floor(Math.random() * this.numCities)
    // "(this.numCities - start)" щоб не вийти за границі массиву
    const end = Math.floor(Math.random() * (this.numCities - start)) + start
    const child = parent1.slice(start, end) // отримуємо ланцюжок у першого батька

    // заповнюємо остачу ланцюжка генами другого батька
    for (let city of parent2) {
      // якщо міста немає в массив...
      if (!child.includes(city)) {
        child.push(city) // ...то додаємо
      }
    }
    return child
  }

  mutate(tour) {
    for (let i = 0; i < this.numCities; i++) {
      if (Math.random() < this.mutationRate) {
        // заміна двох рандомних міст
        const index1 = Math.floor(Math.random() * this.numCities)
        const index2 = (index1 + 1) % this.numCities
        ;[tour[index1], tour[index2]] = [tour[index2], tour[index1]]
      }
    }
  }

  calculateTourDistance(tour) {
    let distance = 0
    for (let i = 0; i < this.numCities; i++) {
      const fromCity = this.cities[tour[i]] // місто і
      const toCity = this.cities[tour[(i + 1) % this.numCities]] // місто і+1
      distance += fromCity.distanceTo(toCity) // калькулюємо дистанція між ними
    }
    return distance
  }

  // фунція тасування елементів массиву популяції, (нові елементи не додаються)
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  findBestTour() {
    let bestTour = this.population[0]
    let bestDistance = this.calculateTourDistance(bestTour)
    for (let tour of this.population) {
      const distance = this.calculateTourDistance(tour)
      if (distance < bestDistance) {
        bestDistance = distance
        bestTour = tour
      }
    }
    return bestTour
  }

  calculateFitness() {
    this.fitness = []
    for (let i = 0; i < this.populationSize; i++) {
      const tour = this.population[i]
      const distance = this.calculateTourDistance(tour)
      const fitness = distance
      this.fitness.push(fitness)
    }
  }
}

const numCities = 5
const populationSize = 100
const mutationRate = 0.01

const tspGA = new TSPGeneticAlgorithm(numCities, populationSize, mutationRate)
tspGA.initialize()

for (let generation = 0; generation < 1000; generation++) {
  tspGA.calculateFitness()
  tspGA.evolve()
}

const bestTour = tspGA.findBestTour()
console.log('Кращий шлях:', bestTour)
console.log('Краща дистанція:', tspGA.calculateTourDistance(bestTour))
console.log(tspGA.fitness)
```

###### Minimize max lateness

```javascript
function minimizeMaxLateness(jobs) {
  jobs.sort((a, b) => a[1] - b[1])
  let schedule = []
  let time = 0
  let maxLateness = 0
  for (let job of jobs) {
    schedule.push(job)
    time += job[0]
    let lateness = Math.max(0, time - job[1])
    maxLateness = Math.max(maxLateness, lateness)
  }
  return [schedule, maxLateness]
}

let jobs = [
  [3, 5],
  [2, 7],
  [1, 3],
  [2, 5],
]

let [schedule, maxLateness] = minimizeMaxLateness(jobs)
console.log(schedule) // [[1, 3], [3, 5], [2, 5], [2, 7]]
console.log(maxLateness) // 1
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

###### Binary search

```javascript
const binarySearch = (arr, target) => {
  let left = 0
  let right = arr.length - 1
  let mid = 0
  while (left <= right) {
    mid = Math.round((right + left) / 2)
    if (target == arr[mid]) return mid
    if (target < arr[mid]) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return -1
}
```

###### Binary

```javascript
function binaryImage(imageData, ctx, canvas, threshold) {
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i]
    const green = data[i + 1]
    const blue = data[i + 2]

    const grayscale = (red + green + blue) / 3

    data[i] = grayscale
    data[i + 1] = grayscale
    data[i + 2] = grayscale
  }

  for (let i = 0; i < data.length; i += 4) {
    const grayscale = data[i]
    if (grayscale > threshold * 255) {
      data[i] = 255
      data[i + 1] = 255
      data[i + 2] = 255
    } else {
      data[i] = 0
      data[i + 1] = 0
      data[i + 2] = 0
    }
  }

  ctx.putImageData(imageData, 0, 0)

  const binaryImage = new Image()
  binaryImage.src = canvas.toDataURL()
  document.body.appendChild(binaryImage)
}
```

###### Negative

```javascript
function negative(imageData, ctx, canvas) {
  for (let i = 0; i < imageData.height; i++) {
    for (let j = 0; j < imageData.width; j++) {
      let x = i * 4 * imageData.width + j * 4

      let avg = 255 - (imageData.data[x] + imageData.data[x + 1] + imageData.data[x + 2] / 3)

      imageData.data[x] = avg
      imageData.data[x + 1] = avg
      imageData.data[x + 2] = avg
    }
  }

  ctx.putImageData(imageData, 0, 0)

  const binaryImage = new Image()
  binaryImage.src = canvas.toDataURL()
  document.body.appendChild(binaryImage)
}
```

###### Grayscale

```javascript
function grayscale(imageData, ctx, canvas) {
  for (let i = 0; i < imageData.height; i++) {
    for (let j = 0; j < imageData.width; j++) {
      let x = i * 4 * imageData.width + j * 4

      let avg = imageData.data[x] + imageData.data[x + 1] + imageData.data[x + 2] / 3

      imageData.data[x] = avg
      imageData.data[x + 1] = avg
      imageData.data[x + 2] = avg
    }
  }

  ctx.putImageData(imageData, 0, 0)

  const binaryImage = new Image()
  binaryImage.src = canvas.toDataURL()
  document.body.appendChild(binaryImage)
}
```

###### Huffman coding

```javascript
class Node {
  constructor(char, frequency) {
    this.char = char
    this.frequency = frequency
    this.left = null
    this.right = null
  }
}

function buildTree(text) {
  const frequencyTable = {}
  for (const char of text) {
    if (char in frequencyTable) {
      frequencyTable[char]++
    } else {
      frequencyTable[char] = 1
    }
  }

  const nodes = []
  for (const char in frequencyTable) {
    const node = new Node(char, frequencyTable[char])
    nodes.push(node)
  }

  while (nodes.length > 1) {
    nodes.sort((a, b) => b.frequency - a.frequency)
    const left = nodes.pop()
    const right = nodes.pop()
    const parent = new Node(null, left.frequency + right.frequency)
    parent.left = left
    parent.right = right
    nodes.push(parent)
  }

  return nodes[0]
}

function buildCodes(node, prefix = '', codes = {}) {
  if (node) {
    if (!node.left && !node.right) {
      codes[node.char] = prefix
    }
    buildCodes(node.left, prefix + '0', codes)
    buildCodes(node.right, prefix + '1', codes)
  }
}

function encode(text, codes) {
  let encoded = ''
  for (const char of text) {
    encoded += codes[char]
  }
  return encoded
}

function decode(encoded, root) {
  let decoded = ''
  let currentNode = root
  for (const bit of encoded) {
    if (bit === '0') {
      currentNode = currentNode.left
    } else {
      currentNode = currentNode.right
    }
    if (!currentNode.left && !currentNode.right) {
      decoded += currentNode.char
      currentNode = root
    }
  }
  return decoded
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

###### Throttle

```javascript
const throttle = (callback, delay = 1000) => {
  let isThrottled = false
  let savedThis, savedArgs

  function anonimous() {
    if (isThrottled) {
      savedArgs = arguments
      savedThis = this
      return
    }

    callback.apply(this, arguments)
    isThrottled = true

    setTimeout(() => {
      isThrottled = false
      if (savedArgs) {
        anonimous.apply(savedThis, savedArgs)
        savedArgs = savedThis = null
      }
    }, delay)
  }
  return anonimous
}
```

###### Debounce

```javascript
const debounce = (callback, delay) => {
  let timer = null
  return function anonimousFn(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}
```

###### Curry

```javascript
function curry(func) {
  return function (a) {
    return function (b) {
      return func(a, b)
    }
  }
}
```

###### Cache

```javascript
function cache(func) {
  const cache = new Map()
  return function (x) {
    if (cache.has(x)) return cache.get(x)
    const result = func.call(this, x)
    cache.set(x, result)
    return result
  }
}
```

###### Knapsack problem

```javascript
function knapsackProblem(values, weights, capacity) {
  const n = values.length
  const dp = new Array(capacity + 1).fill(0)
  const selectedItems = new Array(n).fill(0)

  for (let w = 0; w <= capacity; w++) {
    for (let i = 0; i < n; i++) {
      if (weights[i] <= w) {
        const newValue = dp[w - weights[i]] + values[i]
        if (newValue > dp[w]) {
          dp[w] = newValue
          selectedItems[w] = i
        }
      }
    }
  }

  const selected = []
  let w = capacity
  while (w > 0) {
    const selectedItem = selectedItems[w]
    if (selectedItem >= 0) {
      selected.push(selectedItem)
      w -= weights[selectedItem]
    } else {
      break
    }
  }

  return {
    maxValue: dp[capacity],
    selectedItems: selected.reverse(),
  }
}

const values = [1, 6, 4, 7, 6]
const weights = [3, 4, 5, 8, 9]
const capacity = 13

const maxTotalValue = knapsackProblem(values, weights, capacity)
```

###### Simple moving average

```javascript
function simpleMovingAverage(data, n) {
  if (n > data.length) return -1
  let result = 0
  let resultsArr = []

  for (let idx = n; idx < data.length + 1; idx++) {
    let elements = data.slice(idx - n, idx)

    elements.forEach((el) => {
      result += el
    })

    resultsArr.push(result / n)
    result = 0
  }

  return resultsArr
}
```

###### Jaccard similarity

```javascript
function jaccardSimilarity(text1, text2) {
  const words1 = text1.split(/\s+/)
  const words2 = text2.split(/\s+/)
  const intersection = words1.filter((word) => words2.includes(word))
  const union = [...new Set([...words1, ...words2])]
  return intersection.length / union.length
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

###### Linked list

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

###### Binary tree

```javascript
class Node {
  left = null
  right = null
  parent = null
  constructor(value) {
    this.value = value
  }
}

class BinaryTree {
  root = null

  add(value) {
    if (!this.root) {
      this.root = new Node(value)
      return
    }

    let current = this.root
    let parent = null
    while (true) {
      parent = current
      if (value < current.value) {
        if (current.left == null) {
          current.left = new Node(value)
          current.left.parent = parent
          return
        }
        current = current.left
      }
      parent = current
      if (value > current.value) {
        if (current.right == null) {
          current.right = new Node(value)
          current.right.parent = parent
          return
        }
        current = current.right
      }
    }
  }

  remove(value) {
    if (!this.root) {
      console.log('Tree is empty')
      return
    }

    if (value == this.root.value) {
      let predecessor = this.predecessor(this.root.value)
      this.root.value = predecessor.value
      if (predecessor.parent.left === predecessor) predecessor.parent.left = null
      if (predecessor.parent.right === predecessor) predecessor.parent.right = null
      return
    }

    const current = this._find(value)
    if (current.value != value) return

    if (current.left == null && current.right == null) {
      if (current.parent.left == current) current.parent.left = null
      if (current.parent.right == current) current.parent.right = null
    } else if (current.left != null && current.right != null) {
      const predecessor = this.predecessor(value)
      if (predecessor.parent.left == predecessor) predecessor.parent.left = null
      if (predecessor.parent.right == predecessor) predecessor.parent.right = null
      if (current.parent.left == current) {
        predecessor.parent = current.parent
        current.parent.left = predecessor
        if (current.left != null) {
          predecessor.left = current.left
          current.left.parent = predecessor
        }
        if (current.right != null) {
          predecessor.right = current.right
          current.right.parent = predecessor
        }
      }
      if (current.parent.right == current) {
        predecessor.parent = current.parent
        current.parent.right = predecessor
        if (current.left != null) {
          predecessor.left = current.left
          current.left.parent = predecessor
        }
        if (current.right != null) {
          predecessor.right = current.right
          current.right.parent = predecessor
        }
      }
    }
    if (current.left != null && current.right == null) {
      if (current.parent.left === current) {
        current.parent.left = current.left
        current.left.parent = current.parent
      }
      if (current.parent.right === current) {
        current.parent.right = current.left
        current.right.parent = current.parent
      }
    }
    if (current.left == null && current.right != null) {
      if (current.parent.left === current) {
        current.parent.left = current.right
        current.left.parent = current.parent
      }
      if (current.parent.right === current) {
        current.parent.right = current.right
        current.right.parent = current.parent
      }
    }
  }

  preorderTraversal() {
    this._preorderTraversal(this.root)
  }

  _preorderTraversal(node) {
    if (node != null) {
      this._preorderTraversal(node.left)
      console.log(node.value)
      this._preorderTraversal(node.right)
    }
  }

  postorderTraversal() {
    this._postorderTraversal(this.root)
  }

  _postorderTraversal(node) {
    if (node != null) {
      this._postorderTraversal(node.right)
      console.log(node.value)
      this._postorderTraversal(node.left)
    }
  }

  predecessor(target) {
    if (this.root == null) {
      console.log('Tree is empty')
      return
    }
    let current = this._find(target)
    if (current.left != null) {
      let left = current.left
      while (left.right != null) left = left.right
      return left
    }
  }

  successor(target) {
    if (this.root == null) {
      console.log('Tree is empty')
      return
    }
    let current = this._find(target)
    if (current.right != null) {
      let right = current.left
      while (right.left != null) right = right.left
      console.log('Successor:', right.value)
    }
  }

  _find(target) {
    let current = this.root
    while (current !== null) {
      if (current.value === target) {
        break
      } else if (current.value < target && current.right !== null) {
        current = current.right
      } else if (current.value > target && current.left !== null) {
        current = current.left
      } else {
        break
      }
    }
    return current
  }
}
```

```

```
