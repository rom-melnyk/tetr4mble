import { reactive, InjectionKey } from "vue";
import { Field } from "./field";

export const cursorInjectionKey: InjectionKey<Cursor> = Symbol("cursor")

export class Cursor {
  public readonly position = reactive({ x: 0, y: 0 })

  constructor(
    private readonly filed: Field
  ) {
    let x = 0
    while (!this.isValidPosition(x, 0) && x < filed.width - 2) x++
    if (!this.isValidPosition(x, 0))
      throw new Error("Invalid field: cannot position the cursor")

    this.position.x = x
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
    const a = this.filed.getCellAt(this.position.x, this.position.y)
    const b = this.filed.getCellAt(this.position.x + 1, this.position.y)
    const c = this.filed.getCellAt(this.position.x + 1, this.position.y + 1)
    const d = this.filed.getCellAt(this.position.x, this.position.y + 1)

    a.x++
    this.filed.settleCell(a)
    b.y++
    this.filed.settleCell(b)
    c.x--
    this.filed.settleCell(c)
    d.y--
    this.filed.settleCell(d)
  }

  private isValidPosition(x: number, y: number) {
    // AB
    // DC
    const a = this.filed.getCellAt(x, y)
    const b = this.filed.getCellAt(x + 1, y)
    const c = this.filed.getCellAt(x + 1, y + 1)
    const d = this.filed.getCellAt(x, y + 1)
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
