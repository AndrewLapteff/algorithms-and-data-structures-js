function negative(imageData, ctx, canvas) {
  // переводимо зображення в grayscale
  for (let i = 0; i < imageData.height; i++) {
    for (let j = 0; j < imageData.width; j++) {
      let x = i * 4 * imageData.width + j * 4

      // але віднімаємо від 255 значення інтенсивності пікселя
      let avg =
        255 -
        (imageData.data[x] + imageData.data[x + 1] + imageData.data[x + 2] / 3)

      imageData.data[x] = avg
      imageData.data[x + 1] = avg
      imageData.data[x + 2] = avg
    }
  }

  ctx.putImageData(imageData, 0, 0)

  const binaryImage = new Image()
  binaryImage.src = canvas.toDataURL()

  document.body.appendChild(binaryImage)
}
