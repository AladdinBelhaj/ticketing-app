import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddticketComponent } from './dashboard/addticket/addticket.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { AddprojectComponent } from './dashboard/addproject/addproject.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, AddticketComponent, SidebarComponent, AddprojectComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, BrowserAnimationsModule ,MatDialogModule,MatIconModule,MatFormFieldModule,MatStepperModule,MatInputModule, MatSelectModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
