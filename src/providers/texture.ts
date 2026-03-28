import { pickRandom, random } from "@rom98m/utils"
import { type DifficultyLevel } from "./difficulty"

export interface TextureJSON {
  difficulty: DifficultyLevel;
  texture: string[];
}

export type CellTypeMask = "A" | "B" | "C" | "D" | "E" | "F"
export type CellType = 1 | 2 | 3 | 4 | 5 | 6

export class Texture {
  private readonly texture: string[]
  constructor(texture: string[]) {
    this.texture = [...texture]
  }

  getLetterAt(x: number, y: number): CellTypeMask {
    const rowIdx = y % this.texture.length
    const row = this.texture[rowIdx]
    const colIdx = x % row.length
    return row[colIdx] as CellTypeMask
  }
}

const textures = new Map<DifficultyLevel, Texture[]>([[1, []], [2, []], [3, []], [4, []], ])

export function loadTextures(json: TextureJSON[]): typeof textures {
  try {
    return json
    .reduce((map, { difficulty, texture}) => {
      if (difficulty && texture) {
        map.get(difficulty)!.push(new Texture(texture))
      }
      return map
    }, textures)
  } catch (e) {
    console.error("Failed loading `textures.json`", e)
    return textures
  }
}

export function generateCellTypeMap(): { [mask in CellTypeMask]: CellType } {
  const cellTypes = Array(6).fill(0).map((_, i) => i + 1) as CellType[]

  return "ABCDEF"
    .split("")
    .reduce((acc, letter) => {
      const cellTypeIdx = random(cellTypes.length)
      const [cellType] = cellTypes.splice(cellTypeIdx, 1)
      acc[letter as CellTypeMask] = cellType
      return acc
    }, {} as { [mask in CellTypeMask]: CellType })
}

export function pickTexture(difficulty: DifficultyLevel): Texture {
  return pickRandom(textures.get(difficulty)!)
}
