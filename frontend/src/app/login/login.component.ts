import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../model/user';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  private user: User = {email: "",password: ""};
  constructor(private loginService: LoginService) {}

  login() {
    
    this.user.email= this.email;
    this.user.password= this.password;
    this.loginService.login(this.user);
  }
}
