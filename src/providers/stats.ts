import { DifficultyLevel } from "./difficulty"

type StoredStats = Pick<LevelStats, "bestTime" | "bestMoves">

export class LevelStats {
  private static lsKey(lid: number, difficulty: DifficultyLevel) {
    return `T4/L${lid}/D${difficulty}/stats`
  }

  /** Seconds to beat this level at given difficulty */
  public bestTime = 0
  public bestMoves = 0
  /** Seconds played current level */
  public currentTime = 0
  public currentMoves = 0
  /** % (0-100) */
  public progress = 0

  private difficulty: DifficultyLevel = 1

  constructor(
    private readonly levelId: number
  ) {}

  public setDifficulty(difficulty: DifficultyLevel) {
    this.difficulty = difficulty
    this.load()
  }

  private load() {
    try {
      const parsed = JSON.parse(
        localStorage.getItem(LevelStats.lsKey(this.levelId, this.difficulty))
      ) as StoredStats

      this.bestTime = parsed.bestTime || 0
      this.bestMoves = parsed.bestMoves || 0
      this.currentTime = 0
      this.currentMoves = 0
      this.progress = 0
    } catch (e) {
      // Fall back to default values
    }
  }

  private store() {
    const statsToStore: StoredStats = {
      bestTime: this.bestTime,
      bestMoves: this.bestMoves,
    }
    localStorage.setItem(
      LevelStats.lsKey(this.levelId, this.difficulty),
      JSON.stringify(statsToStore)
    )
  }

  public bumpMove() {
    this.currentMoves++
    this.store()
  }

  public bumpTime() {
    this.currentTime++
    this.store()
  }

  public setProgress(progress: number) {
    this.progress = progress
    this.store()
  }

  public finish() {
    if (this.isBestTime()) this.bestTime = this.currentTime
    if (this.isBestMoves()) this.bestMoves = this.currentMoves
    this.progress = 100
    this.store()
  }

  public isBestTime() {
    return this.bestTime === 0 || this.currentTime < this.bestTime
  }

  public isBestMoves() {
    return this.bestMoves === 0 || this.currentMoves < this.bestMoves
  }
}
