import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  
  login(user: User) {

    // Send the login credentials to the backend
    this.http.post<any>('http://localhost:3000/login', user).pipe(
      tap((response) => {
        // Save the token in local storage or in a cookie
        localStorage.setItem('token', response.token);
console.log('im her')
        // Redirect to the dashboard after successful login
        this.router.navigate(['/dashboard']);
      }),
      catchError((error) => {
        // Handle login errors here
        console.error('Login error:', error);
        // Return an observable with a default value or perform additional error handling
        return of(null);
      })
    ).subscribe();
  }
}
