import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddticketComponent } from './ticket/addticket/addticket.component';
import { DashboardComponent } from './dashboard.component';
import { AddprojectComponent } from './project/addproject/addproject.component';
import { TicketComponent } from './ticket/ticket.component';
import { UpdateTicketComponent } from './ticket/update-ticket/update-ticket.component';
import { InfoTicketComponent } from './ticket/info-ticket/info-ticket.component';
import { ProjectComponent } from './project/project.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
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
        component: InfoTicketComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
