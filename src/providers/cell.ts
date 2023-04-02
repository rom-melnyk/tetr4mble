export class Cell {
  public readonly isDummy: boolean

  constructor(
    public x: number,
    public y: number,
    public readonly type,
  ) {
    this.isDummy = type === 0
  }

  public clone() {
    return new Cell(this.x, this.y, this.type)
  }
}
