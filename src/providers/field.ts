import { reactive, InjectionKey } from "vue";
import { Cell } from "./cell"


export const filedInjectionKey: InjectionKey<Field> = Symbol("cursor")

export class Field {
  public static fromJSON(json: string[]) {
    let cells = json
      .map(row => Array.prototype
        .map.call(row, c => new Cell(0, 0, Number(c) || 0)) as Cell[]
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
    const valuableColumns = new Set(
      cells[0]
        .map((c, y) => cells.some(row => !row[y].isDummy) ? y : -1)
    )
    cells = cells.map(row => row.filter((_, x) => valuableColumns.has(x)))

    // 3. Assign proper coords
    cells.forEach(
      (row, y) => row.forEach((cell, x) => {
        cell.x = x
        cell.y = y
      })
    )

    return new Field(cells)
  }

  public readonly width: number
  public readonly height: number

  private readonly originalCells: Cell[][]
  private readonly cells = new Map<string, Cell>()

  private constructor(
    cells: Cell[][],
  ) {
    this.originalCells = cells
    this.width = cells[0].length
    this.height = cells.length
    cells.flat().forEach(c => this.settleCell(reactive(c) as Cell))
  }

  public getAllCells() {
    return Array.from(this.cells.values())
  }

  public getCellAt(x: number, y: number) {
    return this.cells.get(`${x}:${y}`)
  }

  /**
   * Update the cell-in-the-field position as per cell's (new) {x,y}.
   */
  public settleCell(cell: Cell) {
    return this.cells.set(`${cell.x}:${cell.y}`, cell)
  }
}
