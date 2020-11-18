import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {DesktopComponent} from './components/desktop/desktop.component';
import {InterceptorService} from './helpers/interceptor/interceptor.service';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {SavePasswordComponent} from './components/save-password/save-password.component';
import {ErrorInterceptor} from './helpers/interceptor/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    DesktopComponent,
    SignUpComponent,
    SavePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {
}
