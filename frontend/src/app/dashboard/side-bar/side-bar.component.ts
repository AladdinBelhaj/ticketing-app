import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  userRole: string = "";

  constructor(private dataSharingService: LoginService) {}

  ngOnInit(): void {
    this.loadUserRole();
    
    this.dataSharingService.getDataObservable().subscribe(() => {
      console.log('hello');
      this.loadUserRole();
    });
    
  }

  loadUserRole() {
    this.userRole = localStorage.getItem('role') || 'Guest';
    console.log(localStorage.getItem('role'));
  }

  ngOnDestroy(): void {
    console.log('hello');
  }
}
