// фунція яка отримує інформацію про фото
function getBase64Line(img) {
  const originalImage = document.getElementById(img) // отримує елемент
  const canvas = document.createElement('canvas') // створюємо канвас
  const ctx = canvas.getContext('2d') // отримуємо контекст
  canvas.width = originalImage.width
  canvas.height = originalImage.height
  ctx.drawImage(originalImage, 0, 0) // рендеримо зображення на канвас
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height) // в результаті можемо отримати інформацію про зображення
  return { imageData, ctx, canvas }
}
