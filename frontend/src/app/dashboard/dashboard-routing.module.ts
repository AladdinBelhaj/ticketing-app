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
import { UpdateObjectComponent } from './object/update-object/update-object.component';
import { UserComponent } from './userr/user.component';
import { AddUserComponent } from './userr/add-user/add-user.component';
import { InfoUserComponent } from './userr/info-user/info-user.component';
import { UpdateUserComponent } from './userr/update-user/update-user.component';
import { DashboardcomComponent } from './dashboardcom/dashboardcom.component';
import { AddResponsableComponent } from './dashboardcom/add-responsable/add-responsable.component';
import { AnswerTicketComponent } from './dashboardcom/answer-ticket/answer-ticket.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      //ticket
      {
        path: '', // This will match when the URL is /dashboard
        component: DashboardcomComponent,
      },
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
      { path: 'dashboardcom/add-responsable/:id', component: AddResponsableComponent },
      {path:'dashboardcom/answer-ticket/:id', component: AnswerTicketComponent},
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
      {
        path: 'objet/update/:id',
        component: UpdateObjectComponent,
      },
      //user
      { path: 'user', component: UserComponent },
      { path: 'user/add', component: AddUserComponent },
      {
        path: 'user/info/:id',
        component: InfoUserComponent,
      },
      {
        path: 'user/update/:id',
        component: UpdateUserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
