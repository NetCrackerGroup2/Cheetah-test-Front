import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Action} from '../../models/action/action';
import {ActionService} from '../../services/action/action.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-edit-action',
  templateUrl: './edit-action.component.html',
  styleUrls: ['./edit-action.component.css']
})
export class EditActionComponent implements OnInit {
  editForm: FormGroup;
  loading = false;
  successMessage: string;
  action: Action;

  constructor(private route: ActivatedRoute,
              private actionService: ActionService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.action = new Action();
    this.action.id = +this.route.snapshot.paramMap.get('id');
    this.action.description = this.route.snapshot.paramMap.get('description');

    this.editForm = this.formBuilder.group({
      description: new FormControl(this.action.description,
        [Validators.required, Validators.maxLength(300)])
    });
  }

  get description(): any {
    return this.editForm.get('description');
  }

  onSubmit(): void {
    this.successMessage = '';
    this.loading = true;
    this.actionService.save(this.action.id, this.description.value)
      .pipe(take(1))
      .subscribe(() => {
          this.successMessage = 'Description has been successfully updated';
          this.loading = false;
          this.editForm.reset();
        }
      );
  }
}
