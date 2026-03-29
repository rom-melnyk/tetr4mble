import { ref, watch } from "vue"

export type DifficultyLevel = 1 | 2 | 3 | 4
export const maxDifficulty = 4

class Difficulty {
  private static readonly lsKey = "T4/difficulty"

  public readonly level = ref<DifficultyLevel>(1)

  constructor() {
    this.load()
    watch(this.level, () => this.store())
  }

  private load() {
    let level = Number(localStorage.getItem(Difficulty.lsKey))
    if ([1 ,2, 3, 4].indexOf(level) === -1)
      level = 1

    this.level.value = level as DifficultyLevel
  }

  private store() {
    localStorage.setItem(Difficulty.lsKey, this.level.value.toString())
  }
}

const difficulty = new Difficulty()

export const useDifficulty = () => difficulty

export function parseDifficulty(diffString: string): DifficultyLevel {
  const diff = Number(diffString)
  if (diff >= 1 && diff <= maxDifficulty) return diff as DifficultyLevel
  else {
    console.warn(`⚠️ Failed parsing difficulty "${diffString}"; falling back to 1`)
    return 1
  }
}
