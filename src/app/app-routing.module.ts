import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RecoveryPassComponent } from './components/auth/recovery-pass/recovery-pass.component';
import { TesterComponent } from './components/pages/tester/tester.component';
import { HomeTesterComponent } from './components/pages/tester/pages/home-tester/home-tester.component';
import { HistorialpruebasTesterComponent } from './components/pages/tester/pages/historialpruebas-tester/historialpruebas-tester.component';
import { ErrorReportComponent } from './components/pages/tester/pages/error-report/error-report.component';
import { CreateProfileComponent } from './components/shared/create-profile/create-profile.component';
import { HwEditComponent } from './components/pages/tester/pages/hw-edit/hw-edit.component';
import { HwFinishComponent } from './components/pages/tester/pages/hw-finish/hw-finish.component';
import { NotificationsComponent } from './components/pages/dev/notifications/notifications.component';
import { HomeworkComponent } from './components/pages/dev/homework/homework.component';
import { CreateProjectComponent } from './components/shared/create-project/create-project.component';
import { HistoricErrorsComponent } from './components/pages/tester/pages/historic-errors/historic-errors.component';



const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'recovery', component: RecoveryPassComponent
  },
  {
    path: 'loading', component: LoadingComponent
  },
  {
    path: 'signup', component: SignUpComponent
  },
  {
    path: 'crear-perfil', component: CreateProfileComponent
  },
  {
    path: 'create-project', component: CreateProjectComponent
  },
  {
    path: 'tester', component: TesterComponent, children: [
      {
        path: 'tester-home', component: HomeTesterComponent
      },
      {
        path: 'tester-historyTest', component: HistorialpruebasTesterComponent
      },
      {
        path: 'tester-report', component: ErrorReportComponent
      },
      {
        path: 'edit', component: HwEditComponent
      },
      {
        path: 'hw-list', component: HwFinishComponent
      },
      {
        path: 'historial-errors', component: HistoricErrorsComponent
      }
    ]
  },
  {
    path: 'developer', component: TesterComponent, children: [
      {
        path: 'notification', component: NotificationsComponent
      },
      {
        path: 'hw', component: HomeworkComponent
      }
    ],
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'tester'
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'tester'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }