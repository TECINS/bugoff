import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeLeaderComponent } from './components/home-leader/home-leader.component';
import { EditProyectComponent } from './components/edit-proyect/edit-proyect.component';
import { ManageProyectComponent } from './components/manage-proyect/manage-proyect.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home', component: HomeLeaderComponent
      },
      {
        path: 'editar-proyecto', component: EditProyectComponent
      },
      {
        path: 'gestionar-proyecto', component: ManageProyectComponent
      },
      {
        path: '**', redirectTo: 'gestionar-proyecto'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderRoutingModule { }
