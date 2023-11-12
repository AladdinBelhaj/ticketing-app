import { Component, OnInit, ViewChild } from '@angular/core';
import { Ticket } from 'src/app/model/ticket';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TicketService } from 'src/app/service/ticket.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  public ticket!: Ticket[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<any>;
  displayedColumns = ['projet', 'objet', 'etat', 'Opérations'];

  swalConfig: SweetAlertOptions = {
    title: 'Confirmation',
    text: 'Êtes-vous sûr de vouloir supprimer cet enregistrement ?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirmer',
    cancelButtonText: 'Annuler',
    customClass: {
      confirmButton: 'btn btn-success margin-5',
      cancelButton: 'btn btn-secondary margin-5',
    },
    buttonsStyling: false,
  };

  constructor(private ticketservice: TicketService, private router: Router) {}

  ngOnInit() {
    this.ticketservice
      .getTicketsByUser(localStorage.getItem('email')!)
      .subscribe((response: any) => {
        this.ticket = response;
        this.dataSource = new MatTableDataSource(this.ticket);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  applyFilter(event: Event) {
    this.dataSource = new MatTableDataSource(this.ticket);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  removeTicket(ticketId: number | undefined) {
    if (ticketId) {
      this.ticketservice.deleteTicket(ticketId).subscribe(() => {
        this.ticketservice
          .getTicketsByUser(localStorage.getItem('email')!)
          .subscribe((tickets: Ticket[]) => {
            this.ticket = tickets;
            this.dataSource = new MatTableDataSource(this.ticket);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
      });
    }
  }
}
