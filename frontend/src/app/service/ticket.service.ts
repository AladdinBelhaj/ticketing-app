import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../model/ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  saveTicket(ticket: Ticket) {
    return this.http.post(this.apiUrl + '/ticket', ticket);
  }
}
