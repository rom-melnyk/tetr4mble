import { reactive } from "vue";
import { Field } from "./field";

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

  private isValidPosition(x: number, y: number) {
    if (x < 0 || x > this.filed.width - 2) return false
    if (y < 0 || y > this.filed.height - 2) return false

    // AB
    // DC
    const a = this.filed.getCellAt(x, y)
    const b = this.filed.getCellAt(x + 1, y)
    const c = this.filed.getCellAt(x + 1, y + 1)
    const d = this.filed.getCellAt(x, y + 1)
    if (a.isDummy || b.isDummy || c.isDummy || d.isDummy) return false

    return true
  }
}