import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {AuthGuard} from './helpers/authguard.service';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SavePasswordComponent} from './components/save-password/save-password.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {GeneralLibraryComponent} from './components/general-library/general-library.component';
import {EditActionComponent} from './components/edit-action/edit-action.component';
import {CreateCompoundComponent} from './components/create-compound/create-compound.component';
import {ProjectComponent} from './components/project/project.component';
import {CreateProjectComponent} from './components/create-project/create-project.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfilesComponent} from './components/profiles/profiles.component';
import {DataSetComponent} from './components/data-set/data-set.component';
import {EditDataSetComponent} from './components/edit-data-set/edit-data-set.component';
import {ActionsInCompoundComponent} from './components/actions-in-compound/actions-in-compound.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password', component: SavePasswordComponent},
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profiles',
    component: ProfilesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'library-create-compound',
    component: CreateCompoundComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'general-library',
    component: GeneralLibraryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'general-library/edit-action/:id',
    component: EditActionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'general-library/compounds/:id',
    component: ActionsInCompoundComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    component: ProjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-project',
    component: CreateProjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/edit-project/:id',
    component: CreateProjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'data-set/:id',
    component: DataSetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-data-set/:idTestCase/:title/:id',
    component: EditDataSetComponent,
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
