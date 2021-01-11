import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProyectComponent } from './components/create-proyect/create-proyect.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { PorfileComponent } from './components/porfile/porfile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home', component: HomeUserComponent
      },
      {
        path: 'crear-proyecto', component: CreateProyectComponent
      },
      {
        path: 'perfil', component: PorfileComponent
      },
      {
        path: '**', redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
