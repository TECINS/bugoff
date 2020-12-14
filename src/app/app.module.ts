import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecoveryPassComponent } from './components/auth/recovery-pass/recovery-pass.component';
import { ServerPoint } from './config/config.services';
import { TesterComponent } from './components/pages/tester/tester.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { HomeTesterComponent } from './components/pages/tester/pages/home-tester/home-tester.component';
import { HistorialpruebasTesterComponent } from './components/pages/tester/pages/historialpruebas-tester/historialpruebas-tester.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ErrorReportComponent } from './components/pages/tester/pages/error-report/error-report.component';
import { CreateProfileComponent } from './components/shared/create-profile/create-profile.component';
import { HwEditComponent } from './components/pages/tester/pages/hw-edit/hw-edit.component';
import { HwFinishComponent } from './components/pages/tester/pages/hw-finish/hw-finish.component';
import { NotificationsComponent } from './components/pages/dev/notifications/notifications.component';
import { HomeworkComponent } from './components/pages/dev/homework/homework.component';
import { CreateProjectComponent } from './components/shared/create-project/create-project.component';
import { AgregarproyectoComponent } from './agregarproyecto/agregarproyecto.component';

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
    ErrorReportComponent,
    CreateProfileComponent,
    HwEditComponent,
    HwFinishComponent,
    NotificationsComponent,
    HomeworkComponent,
    CreateProjectComponent,
    AgregarproyectoComponent,
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
