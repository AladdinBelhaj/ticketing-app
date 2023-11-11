import { Component } from '@angular/core';
import { Ticket } from 'src/app/model/ticket';
import { TicketService } from 'src/app/service/ticket.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboardcom',
  templateUrl: './dashboardcom.component.html',
  styleUrls: ['./dashboardcom.component.css']
})
export class DashboardcomComponent {
  userName: string = "";
  items: Ticket[] = [];


  constructor(private userService: UserService,private ticketService: TicketService) {}

  ngOnInit(): void {
    // Get the user's email from local storage
    

    const userEmail = localStorage.getItem('email');

    if (userEmail) {
      // Fetch all users and filter by the user's email
      this.userService.getAllUsers().subscribe((users) => {
        const userWithEmail = users.find((user) => user.email === userEmail);
        if (userWithEmail) {
          this.userName = `${userWithEmail.Nom} ${userWithEmail.Prenom}`;
        }
      });
    }


    if (userEmail) {
      this.ticketService.getTicketsByUser(userEmail).subscribe((tickets) => {
        this.items = tickets;
      });
    }
  }
}
