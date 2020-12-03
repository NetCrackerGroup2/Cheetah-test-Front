
import {ActionStatus} from './ActionStatus';
import {ActionProperties} from './ActionProperties';

export class ActionResult{
  action: ActionProperties;
  status: ActionStatus;
  description: string;
  screenshotUrl: string;
}
