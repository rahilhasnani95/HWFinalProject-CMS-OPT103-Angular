import { Component, OnInit } from '@angular/core';
//import { Details } from './logging';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  status = undefined;
  returnUrl: string;

  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userSvc: UserService) {
    if (this.userSvc.CurrentUser) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.compose([Validators.required, Validators.minLength(4)])],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.status = undefined;
    if (this.form.valid) {
      let username = this.form.value.username;
      let password = this.form.value.password;
      this.userSvc.validate(username, password)
        .subscribe(
          result => {
            console.log(result)
            this.userSvc.saveUserState(result);
            
            //this.router.navigate([this.returnUrl]);

            sessionStorage.setItem('empId', result.id);
            //console.log(sessionStorage.getItem('empId'));

            //Admin
            if(result.role == 0)
            this.router.navigateByUrl('/Admin');

            //South Vendor
            if(result.role == 1 && result.id == 2)
            this.router.navigateByUrl('/SouthIndian');

            //Indo Chinese Vendor
            if(result.role == 1 && result.id == 3)
            this.router.navigateByUrl('/IndoChinese');

            //North Vendor
            if(result.role == 1 && result.id == 4)
            this.router.navigateByUrl('/NorthIndian');  
            
             //Employee
             if(result.role == 2)
             this.router.navigateByUrl('/Employee');
           
          },
          err => {
            this.status = { success: false, class: "alert-danger", message: "Login failed. Invalid username and password" }
          }
        );
    } else {
      console.log(this.form.value);
      this.status = { success: false, class: "alert-danger", message: "Invalid login details" }
    }
  }

}
