import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './containers/login/login.component';
import {ForgotPasswordComponent} from './containers/forgot-password/forgot-password.component';
import {AuthGuard} from './guard/authguard.service';
import {SignUpComponent} from './containers/sign-up/sign-up.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'forgotpassword', component: ForgotPasswordComponent},
  {path: 'sign_up', component: SignUpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
