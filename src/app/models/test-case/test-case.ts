export class TestCase {
  id: number;
  title: string;
  projectId: number;
  status: string;
  result: string;

  constructor(title: string, projectId: number, status: string, result: string) {
    this.title = title;
    this.projectId = projectId;
    this.status = status;
    this.result = result;
  }
}
