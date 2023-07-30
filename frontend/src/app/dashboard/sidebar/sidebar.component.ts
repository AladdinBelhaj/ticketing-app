import { Component, Input } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { AddticketComponent } from '../addticket/addticket.component';
import { AddprojectComponent } from '../addproject/addproject.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  
  @Input() sidebarActive = false;

  onSidebarMouseEnter() {
    this.sidebarActive = true;
  }

  onSidebarMouseLeave() {
    this.sidebarActive = false;
  }
  
 
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
    this.dialog.open(AddprojectComponent, {
      width: '750px',
      height: '500px'
    });
  }
}


