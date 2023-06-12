class Node {
  left = null
  right = null
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
    while (true) {
      if (value < current.value) {
        if (current.left == null) {
          current.left = new Node(value)
          return
        }
        current = current.left
      }
      if (value > current.value) {
        if (current.right == null) {
          current.right = new Node(value)
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

    const { current, parent } = this._findParent(value)

    if (current.left == null && current.right == null) {
      if (parent.left == current) parent.left = null
      if (parent.right == current) parent.right = null
    } else {
      const predecessor = this.predecessor(value)
      console.log(predecessor)
    }
    if (current.left != null && current.right == null) {
      if (parent.left == current) parent.left = current.left
      if (parent.right == current) parent.right = current.left
    }
    if (current.left == null && current.right != null) {
      if (parent.left == current) parent.left = current.right
      if (parent.right == current) parent.right = current.right
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
      console.log('Predecessor:', left.value)
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
    while (target != current.value && current.right != null && current.left != null) {
      if (current.value < target && current.right != null) current = current.right
      if (current.value > target && current.left != null) current = current.left
    }
    return current
  }
  _findParent(target) {
    if (target == this.root.value) return { current: this.root, parent: this.root }
    let current = this.root
    let parent = null
    while (target != current.value && current.right != null && current.left != null) {
      parent = current
      if (current.value < target && current.right != null) current = current.right
      if (current.value > target && current.left != null) current = current.left
    }
    let result = { current, parent }
    return result
  }
}

const bt = new BinaryTree()

bt.add(50)
bt.add(45)
bt.add(40)
bt.add(49)
bt.add(51)

bt.postorderTraversal()
bt.predecessor(50)
bt.successor(50)
bt.remove(45)
bt.postorderTraversal()
