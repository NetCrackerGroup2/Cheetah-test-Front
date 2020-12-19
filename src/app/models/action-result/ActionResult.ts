export class ActionResult {
  action: SeleniumAction;
  status: ActionResultStatus;
  resultDescription: string;
  screenshotUrl: string;

}

export class SeleniumAction {
  actionId: number;
  compoundId: number;
  actionType: string;
  element: string;
  argument: string;
}

export enum ActionResultStatus {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL'
}
