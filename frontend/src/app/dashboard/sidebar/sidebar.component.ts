import { Component, Input } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialogConfig} from '@angular/material/dialog';
import { AddticketComponent } from '../addticket/addticket.component';
import { AddprojectComponent } from '../addproject/addproject.component';
import { DialogConfig } from '@angular/cdk/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  
 
  constructor(public dialog: MatDialog){

  }
   ngOnInit(): void {
   }

   addTicket(): void{
    this.dialog.open(AddticketComponent, {
      width: '750px',
      height: '500px'
    });
  }

  addProject(): void{

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.width = '1000px';
    dialogConfig.height = '300px';

    this.dialog.open(AddprojectComponent, dialogConfig);
    
  }
}


