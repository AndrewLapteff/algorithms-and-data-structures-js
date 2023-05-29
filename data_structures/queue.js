module.exports = class Queue {
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