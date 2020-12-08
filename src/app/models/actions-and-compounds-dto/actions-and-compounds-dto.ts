export class ActionsAndCompoundsDto {
  private id: number;
  private kind: string;

  constructor(id: number, kind: string) {
    this.id = id;
    this.kind = kind;
  }

  getId(): number{
    return this.id;
  }

  getType(): string{
    return this.kind;
  }

}
