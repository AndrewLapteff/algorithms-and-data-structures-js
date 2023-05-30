// Time O(n)
// Space O(1)

const maxValue = (nums) => {
  let maxVal = -1e7     // 10000000
  nums.forEach(num => {
    maxVal = num > maxVal ? num : maxVal
  })
  return maxVal
}