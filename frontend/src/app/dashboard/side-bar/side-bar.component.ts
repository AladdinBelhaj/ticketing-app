
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
    // this.userRole = localStorage.getItem('role') || 'Guest';
    this.dataSharingService.getDataObservable().subscribe(() => {
      console.log('hello')
      this.getdata();
    });
  }

  getdata() { 
    this.userRole = localStorage.getItem('role') || 'Guest';
console.log(localStorage.getItem('role'))

  }

  ngOnDestroy(): void {
    console.log('hello')
    this.userRole = "";
  }


  
}
