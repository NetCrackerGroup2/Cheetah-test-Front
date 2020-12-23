export class TestCaseDate {
  id: number;
  projectId: number;
  title: string;
  status: string;
  result: string;
  executionCronDate: string;
  repeatable: boolean;

  constructor(id: number, projectId: number, title: string, status: string, result: string, executionCronDate: string, repeatable: boolean) {
    this.id = id;
    this.projectId = projectId;
    this.title = title;
    this.status = status;
    this.result = result;
    this.executionCronDate = executionCronDate;
    this.repeatable = repeatable;
  }
}
