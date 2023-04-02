export const round4 = (n: number) => n.toFixed(4)

export const rnd = (n: number) => Math.floor(Math.random() * n)

export const pickRandom = <T>(arr: T[]): T => arr[rnd(arr.length)]
