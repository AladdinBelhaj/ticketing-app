import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddticketComponent } from './ticket/addticket/addticket.component';
import { DashboardComponent } from './dashboard.component';
import { AddprojectComponent } from './project/addproject/addproject.component';
import { TicketComponent } from './ticket/ticket.component';
import { UpdateTicketComponent } from './ticket/update-ticket/update-ticket.component';
import { InfoTicketComponent } from './ticket/info-ticket/info-ticket.component';
import { ProjectComponent } from './project/project.component';
import { UpdateProjectComponent } from './project/update-project/update-project.component';
import { ObjectComponent } from './object/object.component';
import { AddObjectComponent } from './object/add-object/add-object.component';
import { InfoProjectComponent } from './project/info-project/info-project.component';
import { InfoObjectComponent } from './object/info-object/info-object.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      //ticket
      {
        path: 'ticket',
        component: TicketComponent,
      },
      {
        path: 'ticket/add',
        component: AddticketComponent,
      },
      { path: 'ticket/update/:id', component: UpdateTicketComponent },
      { path: 'ticket/info/:id', component: InfoTicketComponent },
      //project
      {
        path: 'projet',
        component: ProjectComponent,
      },
      {
        path: 'projet/add',
        component: AddprojectComponent,
      },
      {
        path: 'projet/info/:id',
        component: InfoProjectComponent,
      },
      { path: 'projet/update/:id', component: UpdateProjectComponent },
      //object
      { path: 'objet', component: ObjectComponent },
      { path: 'objet/add', component: AddObjectComponent },
      {
        path: 'objet/info/:id',
        component: InfoObjectComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
