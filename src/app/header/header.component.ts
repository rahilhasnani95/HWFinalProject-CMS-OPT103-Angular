import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  
  ngOnInit() {
  }

  currentUser:any;

  constructor(
      private router: Router,
      private userSvc: UserService
  ) {
      this.userSvc.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
      this.userSvc.logout();
      this.router.navigateByUrl('/Login');
  }

}
