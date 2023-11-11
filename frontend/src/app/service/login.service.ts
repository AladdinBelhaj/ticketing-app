import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, catchError, of, tap } from 'rxjs';
import { User } from '../model/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private dataSubject = new Subject<void>();
  constructor(private http: HttpClient, private router: Router, private userService: UserService) {}
  login(user: User) {
    this.http
      .post<any>('http://localhost:3000/login', user)
      .pipe(
        // send the login credentials to the backend
        tap((response) => {
          // process response from server (if login sucessfull tap receives token)

          localStorage.setItem('token', response.token); // save the token in local storage or in a cookie
          localStorage.setItem('email', user.email);

          this.userService.getAllUsers().subscribe((users) => {
            const userWithEmail = users.find((u) => u.email === user.email);
            if (userWithEmail) {
              localStorage.setItem('role', userWithEmail.Role);
            } else {
              console.error('User with email not found');
            }


            this.router.navigate(['/dashboard']);
            this.triggerGetData()
          });
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
    localStorage.removeItem('email');
    localStorage.removeItem('role'); // Clear the user's role on logout
    localStorage.removeItem('password'); // Clear the user's role on logout
    this.router.navigate(['/login']);
  }



  triggerGetData() {
    this.dataSubject.next();
  }

  getDataObservable() {
    return this.dataSubject.asObservable();
  }
}
