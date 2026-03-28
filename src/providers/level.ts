import { Field } from "./field"
import { Cursor } from "./cursor"
import { LevelStats } from "./stats"
import { DifficultyLevel } from "./difficulty";
import { pickTexture } from "./texture";

export interface LevelJSON {
  description: string;
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

  public asNew(difficuly: DifficultyLevel) {
    const texture = pickTexture(difficuly)
    this.field.applyTexture(texture)
    this.stats.reset()
    this.stats.setDifficulty(difficuly)
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
