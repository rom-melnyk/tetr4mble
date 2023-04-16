export const round4 = (n: number) => n.toFixed(4)

export const rnd = (n: number) => Math.floor(Math.random() * n)

export const pickRandom = <T>(arr: T[]): T => arr[rnd(arr.length)]

export const debounce =
  (fn: (...args: any[]) => void, time: number, ...args: Parameters<typeof fn>):
    () => void =>
  {
    let lastTime = 0
    return () => {
      const newLastTime = Date.now()
      if (newLastTime < (lastTime + time)) return
      lastTime = newLastTime
      return fn(...args)
    }
  }

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

  return chunks
    .map(c => c.toString(10).padStart(2, "0"))
    .join(":")
}
