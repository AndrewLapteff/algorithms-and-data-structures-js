// Throttle - це техніка управління частотою виклику функцій, щоб обмежити частоту виконання певного коду. 
// Застосування функції throttle може бути корисним у випадках, коли необхідно обмежити інтенсивність виконання 
// певних операцій, особливо під час обробки подій, які можуть відбуватись з високою частотою, наприклад, 
// прокрутка сторінки, розміщення миші або ресайз вікна.

const throttle = (callback, delay = 1000) => {
  let isThrottled = false
  let savedThis, savedArgs
  function anonimous() {
    if (isThrottled) {
      // зберігаємо контекст і аргументи за випадок послідньо виконаного колбеку
      savedArgs = arguments
      savedThis = this
      return
    }
    // виконуємо переданий колбек з контекстом і аргументами anonimous функції
    callback.apply(this, arguments)
    // змінюємо флаг на протилежний
    isThrottled = true
    // таймер на зміну флагу на false та виконання посліднього калбеку
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

const callback = (e) => {
  console.log(e.clientX, e.clientY)
}

// отримуємо замкнену функцію, котру тепер можна використовувати скільки завгодно, адже між її виконаннями
// будуть затримки
const throttledFn = throttle(callback, 1000) 