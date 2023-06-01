// Time O(n)
// Space O(1)

const maxValue = (nums) => {
  let maxVal = -Infinity
  nums.forEach(num => {
    maxVal = num > maxVal ? num : maxVal
  })
  return maxVal
}