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
import {LibraryListComponent} from './components/library-list/library-list.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EditLibraryComponent } from './components/edit-library/edit-library.component';
import { LibraryComponent } from './components/library/library.component';
import { LibraryCreateCompoundComponent } from './components/library-create-compound/library-create-compound.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    SavePasswordComponent,
    DashboardComponent,
    LibraryListComponent,
    EditLibraryComponent,
    LibraryComponent,
    LibraryCreateCompoundComponent
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
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
