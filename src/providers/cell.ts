export class Cell {
  public readonly isDummy: boolean

  constructor(
    public x: number,
    public y: number,
    public readonly type: number,
  ) {
    this.isDummy = type === 0
  }

  public clone() {
    return new Cell(this.x, this.y, this.type)
  }
}

export class BorderCell {
  public readonly borders = new Set<"t" | "r" | "b" | "l">()
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly type: number,
  ) {}
}
