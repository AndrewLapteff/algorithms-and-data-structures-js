// total overlapping words / total unique words

function jaccardSimilarity(text1, text2) {
  const words1 = text1.split(/\s+/)
  const words2 = text2.split(/\s+/)
  const intersection = words1.filter((word) => words2.includes(word))
  const union = [...new Set([...words1, ...words2])]
  return intersection.length / union.length
}

const text1 = 'grape banana orange'
const text2 = 'orange grape milk'
// 'grape orange' / 'grape orage banana milk = 2/4 = 0.5

console.log(jaccardSimilarity(text1, text2)) // 0.5
