import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProyectComponent } from './components/create-proyect/create-proyect.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { PorfileComponent } from './components/porfile/porfile.component';
import { ViewErrorComponent } from './components/view-error/view-error.component';
import { ViewErrorAsignedComponent } from './components/view-error-asigned/view-error-asigned.component';

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
        path: 'ver-error/:id_errores', component: ViewErrorComponent
      },
      {
        path: 'ver-error-asignado/:id_errores/:id_usuarios', component: ViewErrorAsignedComponent
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
