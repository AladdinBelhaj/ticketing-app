import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { LoginService } from '../service/login.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  PURE_EMAIL_REGEXP =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  form: FormGroup;
  private user: User = { email: '', password: '' };
  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(8)])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern(this.PURE_EMAIL_REGEXP),
        ])
      ),
      remember: new FormControl(false),
    });
  }
  ngOnInit(): void {
    if (localStorage.getItem('email') && localStorage.getItem('password')) {
      this.form.setValue({
        email: localStorage.getItem('email'),
        password: localStorage.getItem('password'),
        remember: true,
      });
    }
  }

  login() {
    if (this.form.value.remember) {
      localStorage.setItem('eamil', this.form.value.email);
      localStorage.setItem('password', this.form.value.password);
    }
    this.user.email = this.form.value.email;
    this.user.password = this.form.value.password;
    this.loginService.login(this.user);
  }
}
