import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../model/ticket';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TicketService {
  addTicketForm: FormGroup | undefined = undefined;
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  saveTicket(formData: FormData) {
    return this.http.post(this.apiUrl + '/ticket', formData);
  }

  public getTicketsByUser(email: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/ticket/${email}`);
  }
  public updateTicket(id: string, ticket: Ticket): Observable<any> {
    return this.http.put(`${this.apiUrl}/ticket/${id}`, ticket);
  }

  public getTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.apiUrl}/ticket`);
  }
  deleteTicket(ticketId: number): Observable<any> {
    const url = `${this.apiUrl}/ticket/${ticketId}`;
    return this.http.delete(url);
  }
}
