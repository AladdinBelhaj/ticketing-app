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

  // Method to create a notification
  createNotification(notification: Notification): Observable<any> {
    const url = `${this.apiUrl}/notification`; // Replace with your actual endpoint
    return this.http.post(url, notification);
  }

  getAllNotifs(): Observable<Object[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/notification`);
  }



}