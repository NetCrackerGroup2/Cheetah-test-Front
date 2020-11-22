import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {AuthGuard} from './helpers/authguard.service';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SavePasswordComponent} from './components/save-password/save-password.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LibraryListComponent} from './components/library-list/library-list.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: SavePasswordComponent},
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'library/search/:keyword',
    component: LibraryListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'libraries',
    component: LibraryListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
