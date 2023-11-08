import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { Ticket } from '../model/ticket';
import { TicketService } from '../service/ticket.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  items: Ticket[] = [];




  userName: string = "";
  
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
