// Функція debounce - це техніка управління викликами функцій, яка затримує виконання функції до завершення 
// певного періоду часу після останнього виклику. 

const debounce = (callback, delay) => {
  let timer = null
  return function anonimousFn(...args) {
    clearTimeout(timer)    // кожен раз виконується ця сама функція, і вона ж удаляє попередній таймер
    timer = setTimeout(() => {
      callback.apply(this, args)
    }, delay)
  }
}

const cl = (...arg) => { console.log(arg) }
const anonimousFn = debounce(cl, 500)

anonimousFn(1, 'time')
anonimousFn(2, 'time')
anonimousFn(3, 'time')

// [3, 'time']
