export class PlannedTestCase {
  constructor(
    public idProject: number,
    public titleProject: string,
    public idTestCase: number,
    public titleTestCase: string,
    public cronDate: string
  ) { }
}
