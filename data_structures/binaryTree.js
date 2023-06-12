// Бінарне дерево пошуку - це структура даних, яка використовується для організації впорядкованої колекції
// елементів. Принцип його роботи базується на розділенні елементів на дві підмножини за допомогою операції 
// порівняння. Кожен елемент дерева має два дочірніх елементи: лівий і правий нащадки.

// У бінарному дереві пошуку всі значення, менші за кореневий елемент, розміщуються у лівому піддереві, а 
// всі значення, більші за корінь, розміщуються у правому піддереві. Цей принцип рекурсивно застосовується 
// до кожного нащадка. Таким чином, для кожного піддерева виконується умова: всі значення у лівому піддереві 
// менші за значення вузла, і всі значення у правому піддереві більші за значення вузла.

// Пошук у бінарному дереві починається з кореня. Якщо шукане значення дорівнює значенню кореня, пошук 
// завершується. Якщо шукане значення менше кореня, пошук продовжується у лівому піддереві. Якщо шукане 
// значення більше кореня, пошук продовжується у правому піддереві. Цей процес повторюється до досягнення 
// кінцевого вузла зі шуканим значенням або до досягнення невідповідності (коли досягнуто листка дерева, але 
// шукане значення не знайдено).

// Бінарне дерево пошуку дозволяє виконувати ефективний пошук, вставку і видалення елементів. У середньому, 
// часова складність операцій у бінарному дереві пошуку становить O(log n), де n - кількість елементів у 
// дереві. Однак, у найгіршому випадку (якщо дерево несбалансоване), часова складність може становити O(n), 
// що еквівалентно пошуку в несортованому списку.

class Node {
  left = null
  right = null
  parent = null
  constructor(value) {
    this.value = value
  }
}

class BinaryTree {
  root = null

  add(value) {
    if (!this.root) {
      this.root = new Node(value)
      return
    }

    let current = this.root
    let parent = null
    while (true) {
      parent = current
      if (value < current.value) {
        if (current.left == null) {
          current.left = new Node(value)
          current.left.parent = parent
          return
        }
        current = current.left
      }
      parent = current
      if (value > current.value) {
        if (current.right == null) {
          current.right = new Node(value)
          current.right.parent = parent
          return
        }
        current = current.right
      }
    }
  }

  remove(value) {
    if (!this.root) {
      console.log('Tree is empty')
      return
    }

    if (value == this.root.value) {
      let predecessor = this.predecessor(this.root.value)
      this.root.value = predecessor.value
      if (predecessor.parent.left === predecessor) predecessor.parent.left = null
      if (predecessor.parent.right === predecessor) predecessor.parent.right = null
      return
    }

    const current = this._find(value)
    if (current.value != value) return

    if (current.left == null && current.right == null) {
      if (current.parent.left == current) current.parent.left = null
      if (current.parent.right == current) current.parent.right = null
    } else
      if (current.left != null && current.right != null) {
        const predecessor = this.predecessor(value)
        if (predecessor.parent.left == predecessor) predecessor.parent.left = null
        if (predecessor.parent.right == predecessor) predecessor.parent.right = null
        if (current.parent.left == current) {
          predecessor.parent = current.parent
          current.parent.left = predecessor
          if (current.left != null) {
            predecessor.left = current.left
            current.left.parent = predecessor
          }
          if (current.right != null) {
            predecessor.right = current.right
            current.right.parent = predecessor
          }
        }
        if (current.parent.right == current) {
          predecessor.parent = current.parent
          current.parent.right = predecessor
          if (current.left != null) {
            predecessor.left = current.left
            current.left.parent = predecessor
          }
          if (current.right != null) {
            predecessor.right = current.right
            current.right.parent = predecessor
          }
        }
      }
    if (current.left != null && current.right == null) {
      if (current.parent.left === current) {
        current.parent.left = current.left
        current.left.parent = current.parent
      }
      if (current.parent.right === current) {
        current.parent.right = current.left
        current.right.parent = current.parent
      }
    }
    if (current.left == null && current.right != null) {
      if (current.parent.left === current) {
        current.parent.left = current.right
        current.left.parent = current.parent
      }
      if (current.parent.right === current) {
        current.parent.right = current.right
        current.right.parent = current.parent
      }
    }
  }

  preorderTraversal() {
    this._preorderTraversal(this.root)
  }

  _preorderTraversal(node) {
    if (node != null) {
      this._preorderTraversal(node.left)
      console.log(node.value)
      this._preorderTraversal(node.right)
    }
  }

  postorderTraversal() {
    this._postorderTraversal(this.root)
  }

  _postorderTraversal(node) {
    if (node != null) {
      this._postorderTraversal(node.right)
      console.log(node.value)
      this._postorderTraversal(node.left)
    }
  }

  predecessor(target) {
    if (this.root == null) {
      console.log('Tree is empty')
      return
    }
    let current = this._find(target)
    if (current.left != null) {
      let left = current.left
      while (left.right != null) left = left.right
      return left
    }
  }

  successor(target) {
    if (this.root == null) {
      console.log('Tree is empty')
      return
    }
    let current = this._find(target)
    if (current.right != null) {
      let right = current.left
      while (right.left != null) right = right.left
      console.log('Successor:', right.value)
    }
  }

  _find(target) {
    let current = this.root
    while (current !== null) {
      if (current.value === target) {
        break
      } else if (current.value < target && current.right !== null) {
        current = current.right
      } else if (current.value > target && current.left !== null) {
        current = current.left
      } else {
        break
      }
    }
    return current
  }
}

const bt = new BinaryTree()

bt.add(50)
bt.add(45)
bt.add(40)
bt.add(42)
bt.add(49)
bt.add(52)
bt.add(53)
bt.add(51)

bt.remove(50)
bt.remove(45)
bt.remove(45)

bt.preorderTraversal()
