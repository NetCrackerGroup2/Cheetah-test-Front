export class TestScenarioDto {
  title: string;
  description: string;
  idTestCase: number;

  constructor(title: string, description: string, idTestCase: number) {
    this.title = title;
    this.description = description;
    this.idTestCase = idTestCase;
  }
}

