// суть - додаємо весь час гіпотетично потрачений і віднімаємо дедлайн, це покаже скільки ми пропустимо

function minimizeMaxLateness(jobs) {
  // cортуємо роботи за крайнім терміном та за зростанням
  jobs.sort((a, b) => a[1] - b[1])
  let schedule = []
  let time = 0
  let maxLateness = 0
  for (let job of jobs) {
    // додаємо роботу до розкладу
    schedule.push(job)
    // накопичуємо весь час потрачений на роботу
    time += job[0]
    // обчислюємо запізнення віднімаючи від всього уже потраченого часу дедлайн
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
console.log(schedule) // Виведе: [[1, 3], [3, 5], [2, 5], [2, 7]]
console.log(maxLateness) // Виведе: 1
