import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {AuthGuard} from './helpers/authguard.service';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {DesktopComponent} from './components/desktop/desktop.component';
import {SavePasswordComponent} from './components/save-password/save-password.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'desktop', component: DesktopComponent},
  {path: 'reset-password', component: SavePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
