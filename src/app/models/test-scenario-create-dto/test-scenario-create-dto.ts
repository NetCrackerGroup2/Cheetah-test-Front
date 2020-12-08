import {TestScenarioDto} from "../test-scenario-dto/test-scenario-dto";
import {ActionsAndCompoundsDto} from "../actions-and-compounds-dto/actions-and-compounds-dto";

// testScenario DTO with actions and compounds
export class TestScenarioCreateDto {
  testScenario: TestScenarioDto;
  actionsAndCompoundsDto: ActionsAndCompoundsDto[];

  constructor(testScenario: TestScenarioDto, actionsAndCompoundsDto: ActionsAndCompoundsDto[]) {
    this.testScenario = testScenario;
    this.actionsAndCompoundsDto = actionsAndCompoundsDto;
  }
}
