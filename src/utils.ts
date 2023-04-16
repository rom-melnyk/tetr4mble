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
