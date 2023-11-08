
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  userRole: string = "";

  constructor() {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role') || 'Guest';
  }





  
}
