function binaryImage() {
  const { imageData, ctx, canvas } = getBase64Line('img')
  const data = imageData.data

  // переводимо зображення в grayscale
  for (let i = 0; i < data.length; i += 4) {
    const red = data[i]
    const green = data[i + 1]
    const blue = data[i + 2]

    const grayscale = (red + green + blue) / 3

    data[i] = grayscale
    data[i + 1] = grayscale
    data[i + 2] = grayscale
  }

  const threshold = 0.15 // процент від 255 котрий буде межею між чорними пікселями та білими

  for (let i = 0; i < data.length; i += 4) {
    const grayscale = data[i]
    // якщо більше коефіцієнта то
    if (grayscale > threshold * 255) {
      data[i] = 255 // білий колір
      data[i + 1] = 255
      data[i + 2] = 255
      // якщо менше коефіцієнта то
    } else {
      data[i] = 0 // чорний колір
      data[i + 1] = 0
      data[i + 2] = 0
    }
  }

  ctx.putImageData(imageData, 0, 0) // оновляємо зобралення на canvas

  // створюємо змінну під зобреження покищо в пам'яті
  const binaryImage = new Image()
  // додаємо вміст зображення
  binaryImage.src = canvas.toDataURL()

  // прикріпляємо ображення на сторінку
  document.body.appendChild(binaryImage)
}
