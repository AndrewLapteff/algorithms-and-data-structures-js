// Принцип роботи:
// Використовується два цикла, під колонки та рядки. Проходимо по кожній клітинці.
// Виконуємо функцію explore(grid, row, col, visited) для кожної клітинки. Фунція містить 
// перевірки: на ти чи не вийшли ми з границь grid, якщо так то false; перевірка на те
// чи є вершина в visited; перевірка на те чи це той тип вершин які нам потрібні 'L'.
// І після цих перевірок викликаємо explore(grid, row, col, visited) для row +/- 1 та col.
// Так ми можемо пройти по всих сусідах. По суті ми проходимо сусідім для того щоб
// зробити їх visited та повернути тільки одне true на кілька зкупчених вершин, тобто на один острів

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
  if (!isRowInBounds || !isColInBounds) return false     // перевірки на те чи не вийшли ми за межі

  if (visited.has(row + ',' + col)) return false
  visited.add(row + ',' + col)

  if (grid[row][col] == 'W') return false

  explore(grid, row - 1, col, visited) // вижче
  explore(grid, row + 1, col, visited) // нижче
  explore(grid, row, col - 1, visited) // лівіше
  explore(grid, row, col + 1, visited) // правіше 

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

console.log(islandCount(grid)) // 3
