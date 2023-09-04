import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, catchError, tap } from 'rxjs';
import { User } from 'src/app/model/user';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  AddUserForm: FormGroup | undefined = undefined;
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:3000';

  saveUser(user: User) {
    return this.http.post(this.apiUrl + '/user', user);
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user`);
  }
  deleteUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/user/${userId}`;
    return this.http.delete(url);
  }
  public getUserById(id: any): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/getbyid/${id}`);
  }
  public updateUser(id: string, user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/${id}`, user);
  }
}
