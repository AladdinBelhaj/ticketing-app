import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { AddticketComponent } from './addticket/addticket.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(public dialog: MatDialog){

  }
 
  
   ngOnInit(): void {
   
   }

   clickbutton(): void{
    this.dialog.open(AddticketComponent, {
      width: '250px',
      
    });
  }
   }




