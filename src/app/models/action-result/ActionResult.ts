export class ActionResult {
  action: SeleniumAction;
  status: ActionResultStatus;
  resultDescription: string;
  screenshotUrl: string;

  constructor(actionResult: any) {
    this.status = actionResult.status;
    this.resultDescription = actionResult.resultDescription;
    this.screenshotUrl = actionResult.screenshotUrl;
    this.action = new SeleniumAction(actionResult.action);
  }

}

export class SeleniumAction {
  actionId: number;
  compoundId: number;
  actionType: string;
  element: string;
  argument: string;


  constructor(seleniumAction: any) {
    this.actionId = seleniumAction.actionId;
    this.compoundId = seleniumAction.compoundId;
    this.actionType = seleniumAction.actionType;
    this.element = seleniumAction.element;
    this.argument = seleniumAction.argument;
  }
}

export enum ActionResultStatus {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL'
}
