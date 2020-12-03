import {Action} from '../action/action';
import {ActionStatus} from './ActionStatus';

export class ActionResult{
  action: Action;
  status: ActionStatus;
  description: string;
  screenshotUrl: string;
}
