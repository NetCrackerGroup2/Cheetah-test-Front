export class ActionsAndCompounds {
  private id: number;
  private title: string;
  private kind: string;

  constructor(id: number, title: string, kind: string) {
    this.id = id;
    this.title = title;
    this.kind = kind;
  }

  getId(): number{
    return this.id;
  }

  getTitle(): string{
    return this.title;
  }

  getKind(): string{
    return this.kind;
  }

}

