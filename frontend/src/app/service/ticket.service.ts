import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = 'http://localhost:4000';
  constructor(private http: HttpClient) {}

  uploadfile(file: any) {
    return this.http.post(this.apiUrl + '/upload', file);
  }
}
