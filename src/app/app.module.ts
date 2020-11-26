import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecoveryPassComponent } from './components/recovery-pass/recovery-pass.component';
import { ServerPoint } from './config/config.services';
import { TesterComponent } from './components/pages/tester/tester.component';
import { SidebarComponent } from './components/pages/tester/components/sidebar/sidebar.component';
import { HomeTesterComponent } from './components/pages/tester/pages/home-tester/home-tester.component';
import { HistorialpruebasTesterComponent } from './components/pages/tester/pages/historialpruebas-tester/historialpruebas-tester.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    LoadingComponent,
    RegisterComponent,
    RecoveryPassComponent,
    TesterComponent,
    SidebarComponent,
    HomeTesterComponent,
    HistorialpruebasTesterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    ServerPoint
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
