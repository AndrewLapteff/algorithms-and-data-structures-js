class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
  head = null
  tail = null
  constructor() { }

  add(value) {
    if (!this.head) {
      this.head = new Node(value)
      this.tail = this.head
      return
    }
    this.tail.next = new Node(value)
    this.tail = this.tail.next
  }

  traversal() {
    let current = this.head
    let list = []
    while (current !== null) {
      list.push(current.value)
      current = current.next
    }
    return list
  }

  delete(value) {
    if (!this.head) return -1
    if (this.head.value == value) {
      this.head = this.head.next
      return
    }

    let current = this.head
    let parent = null
    while (current.value != value && current.next != null) {
      parent = current
      current = current.next
    }

    if (current.value !== value) return -1

    if (current.next) {
      parent.next = current.next
    } else {
      parent.next = null
    }
  }

  find(value) {
    if (!this.head) return false
    if (this.head.value == value) return true

    let current = this.head
    while (current.value != value && current.next != null) {
      current = current.next
    }
    return current.value == value ? true : false
  }
}