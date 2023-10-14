function knapsackProblem(values, weights, capacity) {
  const n = values.length // кількість доступних предметів
  const dp = new Array(capacity + 1).fill(0) // масив для збереження максимальної вартості для кожної вмістимості
  const selectedItems = new Array(n).fill(0) // масив для відстеження вибраних предметів

  // проходимось по всіх можливих вмістимостях рюкзака
  for (let w = 0; w <= capacity; w++) {
    // проходимось по всіх предметах
    for (let i = 0; i < n; i++) {
      // перевіряємо, чи можна додати поточний предмет у рюкзак з вмістимістю 'w'
      if (weights[i] <= w) {
        // оновлюємо максимальну вартість
        const newValue = dp[w - weights[i]] + values[i] // ціна до додавання поточного елемента + ціна цього елемента
        if (newValue > dp[w]) {
          dp[w] = newValue
          selectedItems[w] = i
        }
      }
    }
  }

  // відновлення вибраних предметів
  const selected = []
  let w = capacity
  while (w > 0) {
    const selectedItem = selectedItems[w]
    if (selectedItem >= 0) {
      selected.push(selectedItem) // запам'ятовуємо цей елемент
      w -= weights[selectedItem] // відкатуємся до ваги рюкзака до додавання цього елмента
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
console.log('Максимальна вартість: ' + maxTotalValue.maxValue)
console.log('Елементи: ' + maxTotalValue.selectedItems)
