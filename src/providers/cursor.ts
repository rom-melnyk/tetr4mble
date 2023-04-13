import { reactive } from "vue"
import { Field } from "./field"
import { DifficultyLevel } from "./difficulty"
import { pickRandom, rnd } from "../utils"

export class Cursor {
  public readonly position = reactive({ x: 0, y: 0 })

  constructor(
    public readonly field: Field
  ) {
    const firstCell = field.getAllCells()[0]
    this.approach(firstCell.x, firstCell.y)
  }

  public move(dx: -1 | 0 | 1, dy: -1 | 0 | 1) {
    const newX = this.position.x + dx
    const newY = this.position.y + dy
    if (this.isValidPosition(newX, newY)) {
      this.position.x = newX
      this.position.y = newY
    }
  }

  public approach(x: number, y: number) {
    type Position = [newX: number, newY: number]

    const possibleNewPositions: Position[] = [
      [x - 1, y - 1],
      [x, y - 1],
      [x - 1, y],
      [x, y],
    ].filter(([newX, newY]) => this.isValidPosition(newX, newY)) as Position[]

    if (possibleNewPositions.length < 1) {
      throw new Error(`Invalid position: cannot reach the ${x}:${y}`)
    }

    let newPosition = possibleNewPositions[0]
    let minDistance = this.distance(...newPosition)
    for (let i = 1; i < possibleNewPositions.length; i++) {
      const candidatePosition = possibleNewPositions[i]
      const candidateDistance = this.distance(...candidatePosition);
      if (candidateDistance < minDistance) {
        newPosition = candidatePosition
        minDistance = candidateDistance
      }
    }

    this.position.x = newPosition[0]
    this.position.y = newPosition[1]
  }

  /**
   * AB   ->   DA
   * DC        CB
   */
  public rotate() {
    const a = this.field.getCellAt(this.position.x, this.position.y)
    const b = this.field.getCellAt(this.position.x + 1, this.position.y)
    const c = this.field.getCellAt(this.position.x + 1, this.position.y + 1)
    const d = this.field.getCellAt(this.position.x, this.position.y + 1)

    a.x++
    this.field.settleCell(a)
    b.y++
    this.field.settleCell(b)
    c.x--
    this.field.settleCell(c)
    d.y--
    this.field.settleCell(d)
  }

  private isValidPosition(x: number, y: number) {
    // AB
    // DC
    const a = this.field.getCellAt(x, y)
    const b = this.field.getCellAt(x + 1, y)
    const c = this.field.getCellAt(x + 1, y + 1)
    const d = this.field.getCellAt(x, y + 1)
    if (!a || !b || !c || !d) return false
    if (a.isDummy || b.isDummy || c.isDummy || d.isDummy) return false

    return true
  }

  private distance(x: number, y: number) {
    const dx = this.position.x < x
      ? x - this.position.x - 1 /* The rightmost part of the cursor can touch the {x,...} */
      : this.position.x - x
    const dy = this.position.y < y
      ? y - this.position.y - 1 /* The bottom part of the cursor can touch the {...,y} */
      : this.position.y - y

    return dx + dy
  }
}

export function shuffleFiled(cursor: Cursor, severity: DifficultyLevel) {
  const cells = cursor.field.getAllCells()
  let numOfRotations = cells.length * severity
  while (--numOfRotations > 0) {
    const cell = pickRandom(cells)
    cursor.approach(cell.x, cell.y)
    let rot = rnd(3) + 1
    while (rot-- > 0) cursor.rotate()
  }
}
