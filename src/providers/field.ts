import { reactive } from "vue"
import { pickRandom } from "@rom98m/utils"
import { Cell, BorderCell } from "./cell"
import { maxDifficulty, type DifficultyLevel } from "./difficulty"
import { generateCellTypeMap, type Texture } from "./texture"

export class Field {
  public width: number
  public height: number
  /**
   * The initial cell order (level_map × texture).
   * `if (cells == initialOrder) isFinished = true`
   */
  private readonly initialOrder = new Map<string, Cell>()
  private readonly initialOrderArr: Cell[]
  private readonly cells = new Map<string, Cell>()

  constructor(cells: Cell[][], texture: Texture) {
    this.width = cells[0].length
    this.height = cells.length

    const textureMap = generateCellTypeMap()

    cells
      .flat()
      .filter(cell => !cell.isDummy)
      .forEach(matrixCell => {
        const cell = matrixCell.clone()
        cell.type = textureMap[texture.getMaskAt(cell.x, cell.y)]
        this.initialOrder.set(`${cell.x}:${cell.y}`, cell.clone())
        this.settleCell(reactive(cell) as Cell)
      })

    this.initialOrderArr = this.getInitialOrder()
  }

  public getAllCells() {
    return Array.from(this.cells.values())
  }

  public isShuffled() {
    return this.initialOrderArr.some(
      ({ x, y, type }) => this.getCellAt(x, y)!.type !== type
    )
  }

  public getBorderCells() {
    return Array
      .from(this.initialOrder.values())
      .reduce((borderCells, { x, y, type }) => {
        const cell = new BorderCell(x, y, type)

        if (!this.initialOrder.has(`${x}:${y - 1}`)) cell.borders.add("t")
        if (!this.initialOrder.has(`${x + 1}:${y}`)) cell.borders.add("r")
        if (!this.initialOrder.has(`${x}:${y + 1}`)) cell.borders.add("b")
        if (!this.initialOrder.has(`${x - 1}:${y}`)) cell.borders.add("l")

        if (cell.borders.size > 0) borderCells.push(cell)

        return borderCells
      }, [] as BorderCell[])
  }

  public getInitialOrder() {
    return Array.from(this.initialOrder.values())
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

  public shuffle(difficulty: DifficultyLevel) {
    const cells = this.getAllCells().filter(c => !c.isDummy)
    let numShuffles = 0
    const maxNumShuffles = cells.length / (maxDifficulty - difficulty + 1)

    do {
      const a = pickRandom(cells)
      let b: Cell
      do { b = pickRandom(cells) } while (b.type === a.type)

      ;[a.type, b.type] = [b.type, a.type]
      numShuffles++
    } while (numShuffles < maxNumShuffles)
  }
}
