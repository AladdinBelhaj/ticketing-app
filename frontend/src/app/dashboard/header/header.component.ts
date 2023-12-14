import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { NotifService } from 'src/app/service/notif.service';
import { Notification } from 'src/app/model/notification';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userNotifs: Notification[] = [];
  notifs: Notification[] = [];
  userEmail: string = localStorage.getItem('email') ?? '';
  count = 0;

  constructor(private service: LoginService, private notifService: NotifService) {}

  ngOnInit(): void {
    // Fetch all notifications and filter them by user
    this.notifService.getAllNotifs().subscribe((notifications) => {
      this.notifs = notifications;
      this.userNotifs = this.notifs.filter((notif) => notif.sentTo === this.userEmail);
      this.count = this.userNotifs.length;
    });
    
  }

  logout() {
    this.service.logout();
  }

}
