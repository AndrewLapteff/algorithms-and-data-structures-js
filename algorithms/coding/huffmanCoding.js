// Це алгоритм стиснення даних без втрат. Ідея полягає в тому, що вхідним символам присвоюються
// коди змінної довжини, довжина яких залежить від частоти відповідних символів.

// зазвичай один символ коштує 8 біт
// Використовується в ZIP, JPEG та ін.

class Node {
  constructor(char, frequency) {
    this.char = char
    this.frequency = frequency
    this.left = null
    this.right = null
  }
}

function buildTree(text) {
  const frequencyTable = {}
  for (const char of text) {
    if (char in frequencyTable) {
      frequencyTable[char]++
    } else {
      frequencyTable[char] = 1
    }
  }

  // створюємо вузли під символи
  const nodes = []
  for (const char in frequencyTable) {
    const node = new Node(char, frequencyTable[char])
    nodes.push(node)
  }

  while (nodes.length > 1) {
    // кожного разу треба сортувати елементи для того щоб будувати дерево низу вверх від найрідших до найпоширеніших символів
    nodes.sort((a, b) => b.frequency - a.frequency)
    const left = nodes.pop()
    const right = nodes.pop()
    // створюємо батьківський вузол котрий має посилання на попередньо взяті елементи
    const parent = new Node(null, left.frequency + right.frequency)
    parent.left = left
    parent.right = right
    nodes.push(parent)
  }

  return nodes[0]
}

function buildCodes(node, prefix = '', codes = {}) {
  // колл стек
  if (node) {
    // якщо ми дійшли до листків то додаємо їх в словник разом з закодованим префіксом
    if (!node.left && !node.right) {
      codes[node.char] = prefix
    }
    // всі ліві гілки нумеруємо нульом
    buildCodes(node.left, prefix + '0', codes)
    // праві одиницею
    buildCodes(node.right, prefix + '1', codes)
  }
}

function encode(text, codes) {
  let encoded = ''
  for (const char of text) {
    encoded += codes[char]
  }
  return encoded
}

function decode(encoded, root) {
  let decoded = ''
  let currentNode = root
  for (const bit of encoded) {
    // якщо біт нульовий то треба йти вліву гілку щоб отримати весь символ в бітах
    if (bit === '0') {
      currentNode = currentNode.left
      // і навпаки
    } else {
      currentNode = currentNode.right
    }
    // якщо дійшли до листя то додаємо символ який йому відповідає
    // та повертаємось до корня нашого дерева щоб знайти наступний символ
    if (!currentNode.left && !currentNode.right) {
      decoded += currentNode.char
      currentNode = root
    }
  }
  return decoded
}

const text = 'AABCDDE'
const tree = buildTree(text)

const codes = {}
buildCodes(tree, '', codes) // mutation

const encodedText = encode(text, codes)
console.log('Encoded:', encodedText) // 1111000111010010

const decodedText = decode(encodedText, tree)
console.log('Decoded:', decodedText) // AABCDDE
