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
import {GeneralTestScenarioComponent} from "./components/general-test-scenario/general-test-scenario.component";
import {CreateTestScenarioComponent} from "./components/create-test-scenario/create-test-scenario.component";
import {HistoryTestCaseComponent} from './components/history-test-case/history-test-case.component';
import {TestCaseListComponent} from './components/test-case/test-case-list/test-case-list.component';
import {TestCaseConfigurationComponent} from './components/test-case/test-case-configuration/test-case-configuration.component';
import {LastReportDetailsComponent} from './components/test-case/last-report-details/last-report-details.component';
import {ActionsInTestScenarioComponent} from "./components/actions-in-test-scenario/actions-in-test-scenario.component";

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
    path: 'projects/:projectId/create-test-scenario/:id',
    component: CreateTestScenarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:projectId/test-cases/:id/general-test-scenario',
    component: GeneralTestScenarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:projectId/test-scenario/:idTestScenario/test-case/:idTestCase',
    component: ActionsInTestScenarioComponent,
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
    path: 'edit-data-set',
    component: EditDataSetComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'history-test-case',
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
    path: 'projects/:projectId/test-cases/last-report-details',
    component: LastReportDetailsComponent,
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
