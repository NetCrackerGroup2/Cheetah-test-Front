import {Injectable, OnDestroy} from '@angular/core';
import {IWebsocketService, IWsMessage} from './websocket.interfaces';
import {WebSocketSubject, WebSocketSubjectConfig} from 'rxjs/internal-compatibility';
import {distinctUntilChanged, filter, map, share, takeWhile} from 'rxjs/operators';
import {interval, Observable, Observer, Subject, SubscriptionLike} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements IWebsocketService, OnDestroy {

  private readonly config: WebSocketSubjectConfig<IWsMessage<any>>;

  private websocketSub: SubscriptionLike;
  private statusSub: SubscriptionLike;

  private reconnection$: Observable<number>;
  private websocket$: WebSocketSubject<IWsMessage<any>>;
  private connection$: Observer<boolean>;
  private wsMessages$: Subject<IWsMessage<any>>;

  private readonly reconnectInterval: number;
  private readonly reconnectAttempts: number;
  private isConnected: boolean;


  public status: Observable<boolean>;

  constructor() {
    this.wsMessages$ = new Subject<IWsMessage<any>>();

    this.reconnectInterval = 5000;
    this.reconnectAttempts = 10;

    console.log('Websocket constructor');

    this.config = {
      url: environment.ws,
      closeObserver: {
        next: (event: CloseEvent) => {
          this.websocket$ = null;
          this.connection$.next(false);
        }
      },
      openObserver: {
        next: (event: Event) => {
          console.log('WebSocket connected!');
          this.connection$.next(true);
        }
      }
    };

    this.status = new Observable<boolean>((observer) => {
      this.connection$ = observer;
    }).pipe(share(), distinctUntilChanged());

    this.statusSub = this.status
      .subscribe((isConnected) => {
        this.isConnected = isConnected;

        if (!this.reconnection$ && typeof (isConnected) === 'boolean' && !isConnected) {
          this.reconnect();
        }
      });

    this.websocketSub = this.wsMessages$.subscribe({error: (error: ErrorEvent) => console.error('WebSocket error!', error)});

    this.connect();
  }

  ngOnDestroy(): void {
    this.websocketSub.unsubscribe();
    this.statusSub.unsubscribe();
  }

  private connect(): void {
    this.websocket$ = new WebSocketSubject(this.config);
    this.websocket$.subscribe(
      (message) => this.wsMessages$.next(message),
      (error: Event) => {
        if (!this.websocket$) {
          this.reconnect();
        }
      });
  }

  private reconnect(): void {
    this.reconnection$ = interval(this.reconnectInterval)
      .pipe(takeWhile((v, index) => index < this.reconnectAttempts && !this.websocket$));

    this.reconnection$.subscribe({
      next: () => this.connect(),
      complete: () => {
        this.reconnection$ = null;

        if (!this.websocket$) {
          this.wsMessages$.complete();
          this.connection$.complete();
        }
      }
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

    console.log(this.isConnected);
    console.log(event, this.isConnected);
    if (event && this.isConnected) {
      this.websocket$.next({event, data});
    } else {
      console.error('Send error!');
    }
  }

}
