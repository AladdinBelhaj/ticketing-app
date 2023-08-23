import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { AddprojectComponent } from './project/addproject/addproject.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AddticketComponent } from './ticket/addticket/addticket.component';
import { TicketComponent } from './ticket/ticket.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { UpdateTicketComponent } from './ticket/update-ticket/update-ticket.component';
import { InfoTicketComponent } from './ticket/info-ticket/info-ticket.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ProjectComponent } from './project/project.component';
import { InfoProjectComponent } from './project/info-project/info-project.component';
import { UpdateProjectComponent } from './project/update-project/update-project.component';
import { ObjectComponent } from './object/object.component';
@NgModule({
  declarations: [
    DashboardComponent,
    AddticketComponent,
    AddprojectComponent,
    TicketComponent,
    UpdateTicketComponent,
    InfoTicketComponent,
    ProjectComponent,
    InfoProjectComponent,
    UpdateProjectComponent,
    ObjectComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    MatIconModule,
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    DashboardRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    SweetAlert2Module,
    SweetAlert2Module.forRoot(),
  ],
  providers: [SweetAlert2Module],
})
export class DashboardModule {}
