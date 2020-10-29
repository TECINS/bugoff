import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoadingComponent } from './components/shared/loading/loading.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'loading', component: LoadingComponent
  },
  {
    path: 'signup', component: SignUpComponent
  },
  {
    path: '**', pathMatch: 'full', redirectTo: 'login'
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }