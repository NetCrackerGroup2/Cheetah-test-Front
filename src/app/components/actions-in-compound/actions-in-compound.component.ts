import {Component, OnInit} from '@angular/core';
import {Action} from '../../models/action/action';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionService} from '../../services/action/action.service';
import {take} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-actions-in-compound',
  templateUrl: './actions-in-compound.component.html',
  styleUrls: ['./actions-in-compound.component.css']
})
export class ActionsInCompoundComponent implements OnInit {
  compoundName: string;
  actions: Action[];
  compoundId: number;
  subscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private actionsService: ActionService) {
  }

  ngOnInit(): void {
    this.compoundId = +this.route.snapshot.paramMap.get('id');
    this.subscription = this.route
      .queryParams
      .subscribe(params => {
        this.compoundName = params.compoundTitle || '';
      });

    this.actionsService.getActionsByCompoundId(this.compoundId)
      .pipe(take(1))
      .subscribe(
        data => {
          this.actions = data;
        }
      );
  }

}
