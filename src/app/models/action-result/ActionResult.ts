import {ActionStatus} from './ActionStatus';

export class ActionResult{
  compoundId: number;
  result: ActionStatus;
  screenshotURL: string;
  actionType: string;
  element: string;
  argument: string;
}
