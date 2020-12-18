import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecoveryPassComponent } from './components/auth/recovery-pass/recovery-pass.component';
import { ServerPoint } from './config/config.services';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { HomeTesterComponent } from './components/pages/tester/home-tester/home-tester.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ErrorReportComponent } from './components/pages/tester/error-report/error-report.component';
import { CreateProfileComponent } from './components/shared/create-profile/create-profile.component';
import { HomeworkComponent } from './components/pages/dev/homework/homework.component';
import { CreateProjectComponent } from './components/shared/create-project/create-project.component';
import { AgregarproyectoComponent } from './components/shared/home/agregarproyecto/agregarproyecto.component';
import { HistoricErrorsComponent } from './components/pages/tester/historic-errors/historic-errors.component';
import { HomeComponent } from './components/shared/home/home.component';
import { InitialPageComponent } from './components/shared/home/initial-page/initial-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    RecoveryPassComponent,
    SidebarComponent,
    HomeTesterComponent,
    ErrorReportComponent,
    CreateProfileComponent,
    HomeworkComponent,
    CreateProjectComponent,
    AgregarproyectoComponent,
    HistoricErrorsComponent,
    HomeComponent,
    InitialPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    ServerPoint
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
