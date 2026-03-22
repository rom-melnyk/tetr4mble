export const formatTime = (seconds: number) => {
  if (seconds === 0) return "00" as string

  const chunks: number[]  = []
  const divisors: number[] = [60, 60, 24] // sec:min:hrs

  while (seconds > 0 && chunks.length < divisors.length) {
    const div = divisors[chunks.length]
    const chunk = seconds % div
    seconds = Math.floor(seconds / div)
    chunks.unshift(chunk)
  }

  if (chunks.length === 1) chunks.unshift(0)

  return chunks
    .map(c => c.toString(10).padStart(2, "0"))
    .join(":")
}
