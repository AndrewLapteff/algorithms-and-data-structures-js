function grayscale(imageData, ctx, canvas) {
  for (let i = 0; i < imageData.height; i++) {
    for (let j = 0; j < imageData.width; j++) {
      let x = i * 4 * imageData.width + j * 4
      // знаходимо значення інтенсивності кожного пікселя
      let avg =
        imageData.data[x] + imageData.data[x + 1] + imageData.data[x + 2] / 3

      // замінюємо значення RGB на це значення
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
