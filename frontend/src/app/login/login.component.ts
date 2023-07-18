import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const loginData = { email: this.email, password: this.password };

    // Send the login credentials to the backend
    this.http.post<any>('http://localhost:3000/login', loginData).pipe(
      tap((response) => {
        // Save the token in local storage or in a cookie
        localStorage.setItem('token', response.token);
        
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
