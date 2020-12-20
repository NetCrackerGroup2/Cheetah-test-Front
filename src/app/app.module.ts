import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {InterceptorService} from './helpers/interceptor/interceptor.service';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SavePasswordComponent} from './components/save-password/save-password.component';
import {ErrorInterceptor} from './helpers/interceptor/error.interceptor';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {SidebarModule} from 'ng-sidebar';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DataSetComponent} from './components/data-set/data-set.component';
import { GeneralLibraryComponent } from './components/general-library/general-library.component';
import { ActionComponent } from './components/action/action.component';
import { CompoundComponent } from './components/compound/compound.component';
import { EditActionComponent } from './components/edit-action/edit-action.component';
import { CreateCompoundComponent } from './components/create-compound/create-compound.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { EditDataSetComponent } from './components/edit-data-set/edit-data-set.component';
import { ProjectComponent } from './components/project/project.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ActionsInCompoundComponent } from './components/actions-in-compound/actions-in-compound.component';
import { HistoryTestCaseComponent } from './components/history-test-case/history-test-case.component';
import {TestCaseListComponent} from './components/test-case/test-case-list/test-case-list.component';
import {TestCaseConfigurationComponent} from './components/test-case/test-case-configuration/test-case-configuration.component';
import {TestCaseInfoComponent} from './components/test-case-info/test-case-info.component';
import {SendReportComponent} from './components/send-report/send-report.component';
import {CircularDiagramComponent} from './components/circular-diagram/circular-diagram/circular-diagram.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {NgCircleProgressModule} from 'ng-circle-progress';
import { EditWatchersComponent } from './components/edit-watchers/edit-watchers.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AddCalendarEventComponent } from './components/add-calendar-event/add-calendar-event.component';
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { EditCalendarEventComponent } from './components/edit-calendar-event/edit-calendar-event.component';
import { RunDetailsComponent } from './components/run-details/run-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    SavePasswordComponent,
    DashboardComponent,
    DataSetComponent,
    GeneralLibraryComponent,
    ActionComponent,
    CompoundComponent,
    EditActionComponent,
    CreateCompoundComponent,
    ProfileComponent,
    ProfilesComponent,
    EditDataSetComponent,
    ProjectComponent,
    CreateProjectComponent,
    ActionsInCompoundComponent,
    HistoryTestCaseComponent,
    TestCaseListComponent,
    TestCaseConfigurationComponent,
    SendReportComponent,
    TestCaseInfoComponent,
    CircularDiagramComponent,
    NotificationsComponent,
    CalendarComponent,
    AddCalendarEventComponent,
    EditCalendarEventComponent,
    NotificationsComponent,
    EditWatchersComponent
    EditWatchersComponent,
    RunDetailsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    SidebarModule,
    DragDropModule,
    NgCircleProgressModule.forRoot({
      backgroundColor: '#F1F1F1',
      backgroundPadding: -18,
      radius: 60,
      toFixed: 0,
      maxPercent: 100,
      outerStrokeWidth: 10,
      outerStrokeColor: '#FF6347',
      innerStrokeColor: '#32CD32',
      innerStrokeWidth: 1,
      showInnerStroke: false,
      startFromZero: false
    }),
    FullCalendarModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
