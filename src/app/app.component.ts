import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HexaKitchen';

  currentUser:any;

  constructor(
      private router: Router,
      private userSvc: UserService
  ) {
      this.userSvc.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
      this.userSvc.logout();
      this.router.navigate(['/login']);
  }
}
