import { Cell } from "./cell"

export interface LevelJSON {
  name: string;
  map: string[];
}

export class Level {
  public static parseCells(jsonMap: string[]): Cell[][] {
    let cells = jsonMap
      .map(row => Array.prototype
        .map.call(row, c => new Cell(0, 0, c === " " ? 0 : 1)) as Cell[]
      )

    // 1. Normalize the length of the rows
    const maxRowLength = Math.max(...cells.map(row => row.length))
    cells.forEach(row => {
      while (row.length < maxRowLength) row.push(new Cell(0, 0, 0))
    })

    // 2. Trim all-0
    //    2a. Trim empty rows
    cells = cells.filter(row => row.some(cell => !cell.isDummy))
    //    2a. Trim empty columns
    const columnsWithNonDummyCells = new Set(
      cells[0].map((_, x) => cells.some(row => !row[x].isDummy) ? x : -1)
    )
    cells = cells.map(row => row.filter((_, x) => columnsWithNonDummyCells.has(x)))

    // 3. Assign proper coords
    cells.forEach(
      (row, y) => row.forEach((cell, x) => {
        cell.x = x
        cell.y = y
      })
    )

    return cells
  }

  public readonly id: number
  public readonly name: string
  public readonly matrix: Cell[][]
  public width: number
  public height: number

  constructor(id: number, json: LevelJSON) {
    this.id = id
    this.name = json.name
    this.matrix = Level.parseCells(json.map)
    this.height = this.matrix.length
    this.width = this.matrix[0].length
  }
}

export function loadLevels(json: LevelJSON[]) {
  try {
    json.forEach((level, idx) => {
      const id = idx + 1
      levels.set(id, new Level(id, level))
    })
  } catch (e) {
    console.error("Failed loading `levels.json`", e)
  }
}

const levels = new Map<number, Level>()

export const useLevels = () => levels
