import {Injectable, OnDestroy} from '@angular/core';
import {IWebsocketService, IWsMessage} from './websocket.interfaces';
import {filter, map} from 'rxjs/operators';
import {Observable, Subject, Subscription} from 'rxjs';
import {RxStompService} from '@stomp/ng2-stompjs';
import {Message} from '@stomp/stompjs';
import {AuthService} from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements IWebsocketService, OnDestroy {

  private wsMessages$: Subject<IWsMessage<any>>;
  wsSubscription: Subscription;
  wsStatus$: Observable<any>;

  constructor(
      private rxStompService: RxStompService,
      private authService: AuthService
    ) {
    this.wsMessages$ = new Subject<IWsMessage<any>>();
    this.wsSubscription = this.rxStompService
      .watch('/user/queue/notifications')
      .subscribe((message: Message) => {
      this.wsMessages$.next(JSON.parse(message.body));
    });
  }

  public on<T>(event: string): Observable<T> {
    if (event) {
      return this.wsMessages$.pipe(
        filter((message: IWsMessage<T>) => message.event === event),
        map((message: IWsMessage<T>) => message.data)
      );
    }
  }

  public send(event: string, data: any = {}): void {
      if (event) {
        this.rxStompService.publish(
          {
              destination: '/notifications',
              headers: {Authorization: this.authService.userValue.accessToken},
              body: JSON.stringify({event, data})
            }
          );
      }
  }

  ngOnDestroy(): void {
    this.wsSubscription.unsubscribe();
  }
}
