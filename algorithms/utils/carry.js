// Каррування це перетворення одної фунції з багатьма аргументами
// на багато фунції з одним можливим аргументом
// Причому кожну з цих фунцій можна визивати послідовно в різних стрічках коду

function curry(func) {
  return function (a) {
    return function (b) {
      return func(a, b)
    }
  }
}

// Приклад функції для каррування

const log = (time, message) => {
  console.log(time, message)
}

const curried = curry(log)
const thisTime = curried(new Date())

setInterval(() => {
  thisTime('now') // час не оновляється
  curried(new Date())('now') // час оновляється
}, 1000)
