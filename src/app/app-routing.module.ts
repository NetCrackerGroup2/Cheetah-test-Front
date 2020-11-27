import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {AuthGuard} from './helpers/authguard.service';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SavePasswordComponent} from './components/save-password/save-password.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LibraryListComponent} from './components/library-list/library-list.component';
import {EditLibraryComponent} from './components/edit-library/edit-library.component';
import {LibraryComponent} from './components/library/library.component';
import {LibraryCreateCompoundComponent} from './components/library-create-compound/library-create-compound.component';
import {DataSetComponent} from './components/data-set/data-set.component';

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
    path: 'library-create-compound',
    component: LibraryCreateCompoundComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'libraries',
    component: LibraryListComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'library/:id/:name',
    component: LibraryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'libraries/edit/:id',
    component: EditLibraryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'libraries/edit',
    component: EditLibraryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'data-set',
    component: DataSetComponent,
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
