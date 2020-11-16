import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './containers/login/login.component';
import {ForgotPasswordComponent} from './containers/forgot-password/forgot-password.component';
import {AuthGuard} from './guard/authguard.service';
import {SignUpComponent} from './containers/sign-up/sign-up.component';
import {DesktopComponent} from './containers/desktop/desktop.component';
import {SavePasswordComponent} from './containers/save-password/save-password.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'forgotpassword', component: ForgotPasswordComponent},
  {path: 'sign_up', component: SignUpComponent},
  {path: 'forgotpassword', component: ForgotPasswordComponent},
  {path: 'desktop', component: DesktopComponent},
  {path: 'reset-password', component: SavePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
