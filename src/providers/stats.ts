import { DifficultyLevel } from "./difficulty"

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
      ) as LevelStats

      this.bestTime = parsed.bestTime || 0
      this.bestMoves = parsed.bestMoves || 0
      this.currentTime = parsed.currentTime || 0
      this.currentMoves = parsed.currentMoves || 0
      this.progress = parsed.progress || 0
    } catch (e) {
      // Fall back to default values
    }
  }

  private store() {
    localStorage.setItem(
      LevelStats.lsKey(this.levelId, this.difficulty),
      JSON.stringify(this)
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
    if (this.bestTime === 0 || this.currentTime < this.bestTime)
      this.bestTime = this.currentTime
    if (this.bestMoves === 0 || this.currentMoves < this.bestMoves)
      this.bestMoves = this.currentMoves
    this.progress = 100
    this.store()
  }
}
