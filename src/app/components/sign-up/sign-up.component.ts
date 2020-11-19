import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SignUpService} from '../../services/sign-up/sign-up.service';
import {User} from '../../models/user/user';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  message: string;
  successMessage: string;
  createForm: FormGroup;
  user: User = new User();
  loading = false;

  constructor(
    private router: Router,
    private signUpService: SignUpService,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    });
  }

  get email(): any {return this.createForm.get('email'); }
  get password(): any {return this.createForm.get('password'); }
  get role(): any {return this.createForm.get('role'); }
  get name(): any {return this.createForm.get('name'); }

  onSubmit(): void {
    this.successMessage = '';
    this.message = '';

    this.loading = true;
    this.user.email = this.email.value;
    this.user.name = this.name.value;
    this.user.password = this.password.value;
    this.user.role = this.role.value;

    this.subscription = this.signUpService.postRegisteredUser(this.user)
      .pipe(first())
      .subscribe( {
        next: data => {
          switch (data) {
            case environment.success: {
              this.user = new User();
              this.successMessage = 'Account has been created';
              break;
            } case environment.userExists: {
              this.message = environment.userExists;
              break;
            } default: {
              this.message = 'Server error';
              break;
            }
          }
          this.loading = false;
          this.createForm.reset();
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
