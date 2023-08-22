import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  login(user: User) {
    this.http
      .post<any>('http://localhost:3000/login', user)
      .pipe(
        // send the login credentials to the backend
        tap((response) => {
          // process response from server (if login sucessfull tap receives token)

          localStorage.setItem('token', response.token); // save the token in local storage or in a cookie
          localStorage.setItem('email', user.email);

          this.router.navigate(['/dashboard']); // redirect to the dashboard after login
        }),
        catchError((error) => {
          console.error('Login error:', error); // error handling
          return of(null); // error handling
        })
      )
      .subscribe(); // initiate the HTTP request and handle the responses using tap/catcherror
  }

  logout() {
    localStorage.removeItem('token'); // save the token in local storage or in a cookie
    this.router.navigate(['/login']);
  }
}
