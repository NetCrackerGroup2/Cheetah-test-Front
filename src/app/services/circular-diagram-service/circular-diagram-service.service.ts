import {Injectable} from '@angular/core';
import {WebsocketService} from '../websocket/websocket.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CircularDiagramServiceService {
  public messages: Subject<number>;

  constructor(private wsService: WebsocketService) {
  }
}
