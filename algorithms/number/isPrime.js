//Пошук простого числа

//Для прикладу, якщо ми перевіряємо число 100 на простоту, то ми знаємо, що його множники
// будуть 1, 2, 4, 5, 10, 20, 25, і 50. Ці множники можна розбити на пари (1, 100), (2, 50), (4, 25)
// (5, 20). У кожній парі одне число менше або дорівнює кореню квадратного з 100, яке дорівнює 10.
// Таким чином, ми можемо бути впевнені, що якщо ми не знайшли множника до кореня квадратного з n,
// то НЕМАЄ потреби продовжувати перевірку, оскільки інші множники вже були перевірені.

const isPrime = (n) => {
  if (n < 2) return false
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false
  }
  return true
}
console.log(isPrime(10))
