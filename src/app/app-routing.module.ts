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
    path: 'tester', component: TesterComponent, children: [
      {
        path: 'tester-home', component: HomeTesterComponent
      },
      {
        path: 'tester-historyTest', component: HistorialpruebasTesterComponent
      }
    ]
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'login'
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }