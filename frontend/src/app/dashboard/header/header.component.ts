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
  userEmail = '';
  count = 0;

  constructor(
    private service: LoginService,
    private notifService: NotifService,
    private dataSharingService: LoginService
  ) {}

  ngOnInit(): void {
    this.loadUserEmail();
    this.loadNotifications();
    this.dataSharingService.getDataObservable().subscribe(() => {
      console.log('hello');
      this.loadUserEmail();
      this.loadNotifications();
    });
  }

  private loadNotifications() {
    this.notifService.getAllNotifs().subscribe((notifications) => {
      this.notifs = notifications;
      this.updateCount();
    });
  }

  private updateCount() {
    this.userNotifs = this.notifs.filter(
      (notif) => notif.sentTo === this.userEmail
    );
    this.count = this.userNotifs.length;
  }

  loadUserEmail() {
    this.userEmail = localStorage.getItem('email') || 'Guest';
    console.log(localStorage.getItem('email'));
  }

  logout() {
    this.service.logout();
  }
  getNotificationText(): string {
    return this.userNotifs.map((notif) => notif.notifText).join('\n');
  }
}
