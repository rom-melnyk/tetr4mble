import { reactive } from "vue"
import { type DifficultyLevel } from "./difficulty"

type StoredStats = Pick<LevelStats["data"], "bestTime" | "bestMoves">

export class LevelStats {
  private static lsKey(lid: number, difficulty: DifficultyLevel) {
    return `T4/L${lid}/D${difficulty}/stats`
  }

  public readonly data = reactive({
    levelId: 0,
    difficulty: 1 as DifficultyLevel,
    /** Seconds to beat this level at given difficulty */
    bestTime: 0,
    bestMoves: 0,
    /** Seconds played current level */
    currentTime: 0,
    currentMoves: 0,
  })

  constructor(levelId: number, difficulty: DifficultyLevel) {
    this.data.levelId = levelId
    this.data.difficulty = difficulty
    this.load()
  }

  private load() {
    try {
      const parsed = JSON.parse(
        localStorage.getItem(LevelStats.lsKey(this.data.levelId, this.data.difficulty)) ?? ""
      ) as StoredStats

      this.data.bestTime = parsed.bestTime || 0
      this.data.bestMoves = parsed.bestMoves || 0
      this.data.currentTime = 0
      this.data.currentMoves = 0
    } catch (e) {
      // Fall back to default values
    }
  }

  private store() {
    const statsToStore: StoredStats = {
      bestTime: this.data.bestTime,
      bestMoves: this.data.bestMoves,
    }
    localStorage.setItem(
      LevelStats.lsKey(this.data.levelId, this.data.difficulty),
      JSON.stringify(statsToStore)
    )
  }

  public reset() {
    this.data.currentTime = 0
    this.data.currentMoves = 0
  }

  public bumpMove() {
    this.data.currentMoves++
    this.store()
  }

  public bumpTime() {
    this.data.currentTime++
    this.store()
  }

  public finish() {
    if (this.isBestTime()) this.data.bestTime = this.data.currentTime
    if (this.isBestMoves()) this.data.bestMoves = this.data.currentMoves
    this.store()
  }

  public isBestTime() {
    return this.data.bestTime === 0 || this.data.currentTime < this.data.bestTime
  }

  public isBestMoves() {
    return this.data.bestMoves === 0 || this.data.currentMoves < this.data.bestMoves
  }
}
