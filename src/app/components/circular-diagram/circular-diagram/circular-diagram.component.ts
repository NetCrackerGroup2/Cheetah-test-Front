import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WebsocketService} from '../../../services/websocket/websocket.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-circular-diagram',
  templateUrl: './circular-diagram.component.html',
  styleUrls: ['./circular-diagram.component.css']
})
export class CircularDiagramComponent implements OnInit {
  percent: Subject<number>;
  messageChannel;


  constructor(private router: Router, private wsService: WebsocketService) {
    (wsService
      .connect('http/ahdliuahsdf.com').subscribe(msg => {
          const data = JSON.parse(msg.data);
          data.observable.subscribe(percent => {
            this.percent = percent;
          });
          this.messageChannel = data.observer;
        }
      ));
  }

  ngOnInit(): void {
  }

  goBack(): void {
    // todo
    this.router.navigate(['']);
  }
}
