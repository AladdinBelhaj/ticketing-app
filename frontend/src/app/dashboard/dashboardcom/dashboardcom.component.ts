// dashboardcom.component.ts


import { UserService } from 'src/app/service/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Ticket } from 'src/app/model/ticket';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TicketService } from 'src/app/service/ticket.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';


@Component({
  selector: 'app-dashboardcom',
  templateUrl: './dashboardcom.component.html',
  styleUrls: ['./dashboardcom.component.css'],
})
export class DashboardcomComponent implements OnInit {
  userName: string = '';
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
  constructor(private userService: UserService, private ticketService: TicketService,private router: Router) {}

  ngOnInit(): void {
    const userRole = localStorage.getItem('role');
    const userEmail = localStorage.getItem('email');
    if(userRole == "Client"){
      this.ticketService
      .getTicketsByUser(localStorage.getItem('email')!)
      .subscribe((response: any) => {
        this.ticket = response;
        this.dataSource = new MatTableDataSource(this.ticket);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }else if(userRole == "Admin"){
      this.ticketService
      .getTickets()
      .subscribe((response: any) => {
        this.ticket = response;
        this.dataSource = new MatTableDataSource(this.ticket);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }else{
      let user: any;
      let userName = "";
      this.userService
      .getAllUsers()
      .subscribe((response: any) =>{
         user = response;
         const foundUser = user.find((u: any) => u.email === userEmail);
         userName = `${foundUser.Nom} ${foundUser.Prenom}`;
         console.log(userName)
      });
      
      

      this.ticketService
      .getTickets()
      .subscribe((response: any) => {
        this.ticket = response.filter((t: any) => t.responsable === userName);

        this.dataSource = new MatTableDataSource(this.ticket);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });



    }

    // Get the user's email from local storage


    if (userEmail) {
      // Fetch all users and filter by the user's email
      this.userService.getAllUsers().subscribe((users) => {
        const userWithEmail = users.find((user) => user.email === userEmail);
        if (userWithEmail) {
          this.userName = `${userWithEmail.Nom} ${userWithEmail.Prenom}`;
        }
      });
    }
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
    this.ticketService.deleteTicket(ticketId).subscribe(() => {
      this.ticketService
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
