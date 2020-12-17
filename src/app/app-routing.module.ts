import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RecoveryPassComponent } from './components/auth/recovery-pass/recovery-pass.component';
import { HomeTesterComponent } from './components/pages/tester/home-tester/home-tester.component';
import { ErrorReportComponent } from './components/pages/tester/error-report/error-report.component';
import { CreateProfileComponent } from './components/shared/create-profile/create-profile.component';
import { HomeworkComponent } from './components/pages/dev/homework/homework.component';
import { AgregarproyectoComponent } from './agregarproyecto/agregarproyecto.component';
import { HistoricErrorsComponent } from './components/pages/tester/historic-errors/historic-errors.component';
import { HomeComponent } from './components/shared/home/home.component';
import { InitialPageComponent } from './components/shared/home/initial-page/initial-page.component';

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
    path: 'crear-perfil', component: CreateProfileComponent
  },
  {
    path: 'home', component: HomeComponent, children: [
      {
        path: 'initial-page', component: InitialPageComponent
      },
      {
      path: 'tester-agregar', component: AgregarproyectoComponent
      },
      {
        path: 'tester-home', component: HomeTesterComponent
      },
      {
        path: 'tester-report', component: ErrorReportComponent
      },
      {
        path: 'historial-errors', component: HistoricErrorsComponent
      },
      {
        path: 'hw', component: HomeworkComponent
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
