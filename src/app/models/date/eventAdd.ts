export class EventAdd {
  id: number;
  title: string;
  startStr: string;

  constructor(id: number, title: string, startStr: string) {
    this.id = id;
    this.title = title;
    this.startStr = startStr;
  }
}
