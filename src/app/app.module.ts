import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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
import { GeneralLibraryComponent } from './components/general-library/general-library.component';
import { ActionComponent } from './components/action/action.component';
import { CompoundComponent } from './components/compound/compound.component';
import { EditActionComponent } from './components/edit-action/edit-action.component';
import { CreateCompoundComponent } from './components/create-compound/create-compound.component';
import { EditDataSetComponent } from './components/edit-data-set/edit-data-set.component';
import { ProjectComponent } from './components/project/project.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import {DataSetComponent} from './components/data-set/data-set.component';

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
    EditDataSetComponent,
    ProjectComponent,
    CreateProjectComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    SidebarModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
