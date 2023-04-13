import { Field } from "./field"
import { Cursor } from "./cursor"

export interface LevelJSON {
  description: string;
  shuffle?: string[];
  level: string[];
}

export class LevelStats {
  public bestTime = 0
  public bestMoves = 0
  public currentTime = 0
  public currentMoves = 0
  public progress = 0

  public load() {
    // TODO Implement me
  }

  public store() {
    // TODO Implement me
  }
}

export class Level {
  public readonly description: string
  public readonly field: Field
  public readonly cursor: Cursor
  public readonly stats: LevelStats
  constructor(json: LevelJSON) {
    this.description = json.description
    this.field = Field.fromJSON(json.level)
    this.cursor = new Cursor(this.field)
    this.stats = new LevelStats()
  }
}

export function loadLevels(json: LevelJSON[]): Level[] {
  try {
    levels = json.map(l => new Level(l))
  } catch (e) {
    console.error("Failed loading `levels.json`", e)
  }
  return levels
}

let levels: Level[] = []

export const useLevels = () => levels
