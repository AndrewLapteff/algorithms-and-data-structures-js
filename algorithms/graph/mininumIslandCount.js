// Принцип роботи: працює так само як і 'island count' але тут ми додаємо лічилиник та накопичуємо в нього
// результати рекурсивних викликів

const grid = [
  ['W', 'L', 'W', 'W', 'W'],
  ['W', 'L', 'W', 'W', 'W'],
  ['W', 'W', 'W', 'L', 'W'],
  ['W', 'W', 'L', 'L', 'W'],
  ['L', 'W', 'W', 'L', 'L'],
  ['L', 'L', 'W', 'W', 'W'],
]

const explore = (grid, row, col, visited) => {
  const isRowInBounds = 0 <= row && row < grid.length
  const isColInBounds = 0 <= col && col < grid[0].length
  if (!isRowInBounds || !isColInBounds) return 0     // перевірки на те чи не вийшли ми за межі

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

console.log(mininumIslandCount(grid)) // 2
