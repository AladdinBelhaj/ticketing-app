import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../model/notification';

@Injectable({
  providedIn: 'root',
})
export class NotifService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  createNotification(notification: Notification): Observable<any> {
    const url = `${this.apiUrl}/notification`; 
    return this.http.post(url, notification);
  }

  getAllNotifs(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/notification`);
  }



}