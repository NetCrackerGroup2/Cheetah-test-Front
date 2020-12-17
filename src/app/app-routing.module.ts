import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
import {HistoryTestCaseComponent} from './components/history-test-case/history-test-case.component';
import {TestCaseListComponent} from './components/test-case/test-case-list/test-case-list.component';
import {TestCaseConfigurationComponent} from './components/test-case/test-case-configuration/test-case-configuration.component';
import {TestCaseInfoComponent} from './components/test-case-info/test-case-info.component';
import {SendReportComponent} from './components/send-report/send-report.component';
import {CircularDiagramComponent} from './components/circular-diagram/circular-diagram/circular-diagram.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {EditWatchersComponent} from './components/edit-watchers/edit-watchers.component';

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
    path: 'projects/:id/edit-project',
    component: CreateProjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:projectId/edit-watchers',
    component: EditWatchersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:projectId/test-cases/:id/data-set',
    component: DataSetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:projectId/test-cases/:id/data-set/edit-data-set',
    component: EditDataSetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:id/history-test-case',
    component: HistoryTestCaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:id/test-cases',
    component: TestCaseListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:projectId/test-cases/create-test-case',
    component: TestCaseConfigurationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:projectId/test-cases/edit-test-case/:id',
    component: TestCaseConfigurationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:idProject/test-cases/:idTestCase/:idHTC',
    component: TestCaseInfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:idProject/test-cases/:idTestCase/:idHTC/send-report',
    component: SendReportComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'test-scenario/:idTestScenario',
    component: CircularDiagramComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
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
