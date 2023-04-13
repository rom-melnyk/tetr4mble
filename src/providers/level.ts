import { Field } from "./field"
import { Cursor } from "./cursor"
import { LevelStats } from "./stats"

export interface LevelJSON {
  description: string;
  shuffle?: string[];
  level: string[];
}

export class Level {
  public readonly description: string
  public readonly field: Field
  public readonly cursor: Cursor
  public readonly stats: LevelStats
  constructor(id: number, json: LevelJSON) {
    this.description = json.description
    this.field = Field.fromJSON(json.level)
    this.cursor = new Cursor(this.field)
    this.stats = new LevelStats(id)
  }
}

export function loadLevels(json: LevelJSON[]): Level[] {
  try {
    levels = json.map((level, id) => new Level(id, level))
  } catch (e) {
    console.error("Failed loading `levels.json`", e)
  }
  return levels
}

let levels: Level[] = []

export const useLevels = () => levels
