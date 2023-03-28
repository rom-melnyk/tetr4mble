export class Cell {
  private readonly originalX: number
  private readonly originalY: number

  public readonly isDummy: boolean

  constructor(
    public x: number,
    public y: number,
    public readonly type,
  ) {
    this.originalX = x
    this.originalY = y
    this.isDummy = type === 0
  }

  // TODO Rethink me
  public isPlacedCorrectly(field: Cell[][]) {
    return field[this.y][this.x].type === this.type
  }
}
