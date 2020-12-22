import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';
import {environment} from '../../../environments/environment';

export const myRxStompConfig: InjectableRxStompConfig = {
  brokerURL: environment.wsUrl + '/notifications',

  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,

  reconnectDelay: 200,
};
