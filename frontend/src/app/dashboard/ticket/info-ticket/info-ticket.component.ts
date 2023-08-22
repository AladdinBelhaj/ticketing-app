import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from 'src/app/model/ticket';
import { TicketService } from 'src/app/service/ticket.service';

@Component({
  selector: 'app-info-ticket',
  templateUrl: './info-ticket.component.html',
  styleUrls: ['./info-ticket.component.css'],
})
export class InfoTicketComponent implements OnInit {
  public ticketsList!: Ticket[];

  public ticektId = '';
  ticket!: Ticket;
  constructor(
    private TicketService: TicketService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('id')) {
        this.router.navigate(['/dashboard/ticket']);
      } else {
        this.ticektId = '' + paramMap.get('id');
        this.TicketService.getTicketById(paramMap.get('id')).subscribe(
          (response: Ticket) => {
            this.ticket = response;
          },
          (error: HttpErrorResponse) => {
            alert(error.message);
          }
        );
      }
    });
  }
}
