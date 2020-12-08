import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoveryPassComponent } from './components/recovery-pass/recovery-pass.component';
import { TesterComponent } from './components/pages/tester/tester.component';
import { HomeTesterComponent } from './components/pages/tester/pages/home-tester/home-tester.component';
import { HistorialpruebasTesterComponent } from './components/pages/tester/pages/historialpruebas-tester/historialpruebas-tester.component';
import { ErrorReportComponent } from './components/pages/tester/pages/error-report/error-report.component';
import { CreateProfileComponent } from './components/shared/create-profile/create-profile.component';

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
    path: 'tester', component: TesterComponent, children: [
      {
        path: 'tester-home', component: HomeTesterComponent
      },
      {
        path: 'tester-historyTest', component: HistorialpruebasTesterComponent
      },
      {
        path: 'tester-report', component: ErrorReportComponent
      }
    ]
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