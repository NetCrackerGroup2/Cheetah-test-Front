import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WebsocketService} from './websocket.service';
import {myRxStompConfig} from './websocket.config';
import {
  InjectableRxStompConfig,
  RxStompService,
  rxStompServiceFactory,
} from '@stomp/ng2-stompjs';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    WebsocketService,
    {
      provide: InjectableRxStompConfig,
      useValue: myRxStompConfig,
    },
    {
      provide: RxStompService,
      useFactory: rxStompServiceFactory,
      deps: [InjectableRxStompConfig],
    }
  ]
})
export class WebsocketModule {
}
