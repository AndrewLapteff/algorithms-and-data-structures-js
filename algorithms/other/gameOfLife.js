const canvas = document.getElementById('gameCanvas')
const ctx = canvas.getContext('2d')
const startButton = document.getElementById('startButton')
const stopButton = document.getElementById('stopButton')
const resolution = 10
const rows = canvas.height / resolution
const cols = canvas.width / resolution
let grid = createGrid()

function createGrid() {
  let emptyGrid = new Array(cols)
  for (let i = 0; i < emptyGrid.length; i++) {
    emptyGrid[i] = new Array(rows)
  }

  for (let i = 0; i < emptyGrid.length - 1; i++) {
    for (let j = 0; j < emptyGrid.length - 1; j++) {
      emptyGrid[i][j] = Math.round(Math.random() * 1)
    }
  }
  return emptyGrid
}

function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * resolution
      const y = j * resolution
      ctx.beginPath()
      ctx.rect(x, y, resolution, resolution)
      ctx.fillStyle = grid[i][j] ? 'black' : 'white'
      ctx.fill()
      ctx.stroke()
    }
  }
}

function updateGrid() {
  const newGrid = createGrid()
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const neighbors = countNeighbors(i, j)
      // будь-яка жива клітина з двома-трьома живими сусідами виживає
      if (grid[i][j]) {
        newGrid[i][j] = neighbors === 2 || neighbors === 3
        // будь-яка мертва клітина з трьома живими сусідами стає живою клітиною
      } else {
        newGrid[i][j] = neighbors === 3
      }
    }
  }
  grid = newGrid
}

// функія котра рахує кількість сусідів
function countNeighbors(x, y) {
  let sum = 0
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      // тут ми визначаємо стовпець col та row, в якому знаходиться сусідня клітина. Перевірка (x + i + cols) % cols дозволяє нам обійти обмеження сітки. Якщо x + i (новий стовпець) виходить за межі сітки (більше або менше, ніж кількість стовпців у сітці cols), то % cols витягне його назад до діапазону допустимих значень, забезпечуючи циклічність сітки.
      const col = (x + i + cols) % cols
      // те саме відноситься до row
      const row = (y + j + rows) % rows
      sum += grid[col][row] ? 1 : 0
    }
  }
  sum -= grid[x][y] ? 1 : 0 // до цього ви порахували саму клітину, відносно якої рахували сусідів, тут ми її вираховуємо з обчислення
  return sum
}

let intervalId

function startGame() {
  intervalId = setInterval(() => {
    updateGrid()
    drawGrid()
  }, 100)
}

function stopGame() {
  clearInterval(intervalId)
}

function clearBoard() {
  grid = createGrid()
  drawGrid()
}

drawGrid()

startButton.addEventListener('click', startGame)
stopButton.addEventListener('click', stopGame)
