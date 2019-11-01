import { Component, OnInit } from '@angular/core';
import { EmployeeDetailsService } from './employee-details.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  employeeDetails: EmployeeDetails[];
  errorMsg: any;
  editEmployeeDetails: EmployeeDetails; 
  currentUser: any;
  userId: any;
 

  constructor(public employeeDetailsServices: EmployeeDetailsService,
    private router: Router,   
    private userSvc: UserService
    ) { }

  ngOnInit() {
    this.employeeDetailsServices.getEmployeeDetailsItems().subscribe(
      data => this.employeeDetails = data,
      error => this.errorMsg = error
    );    

    this.userSvc.currentUser.subscribe(x => this.currentUser = x);   
    this.userId = this.currentUser.id;
  }

  add(addForm: NgForm, router: Router) {
    this.editEmployeeDetails = undefined;

    if (addForm.value.balance < 0) {
      alert("Employee Balance can't be Negative");
      return;
    }

    if (addForm.value.balance == 0) {
      alert("Employee Balance can't be Zero");
      return;
    }

    this.employeeDetailsServices.addEmployeeDetailsItems(addForm.value).subscribe();
    this.employeeDetails.push(addForm.value);
      
    alert("New Employee: " + addForm.value.name + " Added!");
    addForm.resetForm();
    router.navigateByUrl('/EmployeeDetails');

  }

  delete(employeeDetails: EmployeeDetails, router: Router): void {
    if (confirm("Are you sure you want to delete: " + employeeDetails.name + "?")) {
      this.employeeDetails = this.employeeDetails.filter(n => n !== employeeDetails);
      this.employeeDetailsServices.deleteEmployeeDetailsItems(employeeDetails.id).subscribe();
      router.navigateByUrl('/EmployeeDetails');
      alert("Employee: " + employeeDetails.name + " Deleted!");
    }
  }

  edit(employeeDetails: EmployeeDetails) {
    this.editEmployeeDetails = employeeDetails;
  }

  update() {
    if (this.editEmployeeDetails) {

      if (this.editEmployeeDetails.imageUrl == "") {
        alert("Image Url is required!");
        return;
      }

      if (this.editEmployeeDetails.name == "") {
        alert("Employee Name is required!");
        return;
      }

      if (this.editEmployeeDetails.contact == "") {
        alert("Employee Contact is required!");
        return;
      }

      if (!(this.editEmployeeDetails.contact.length==12)) {
        //console.log(this.editEmployeeDetails.contact.length);
        alert("Employee Contact must be 12 characters in length in the format: ***-***-****");
        return;
      }

      if (this.editEmployeeDetails.email == "") {
        alert("Employee Email is required!");
        return;
      }

      if (!(this.editEmployeeDetails.email.includes("@"))) {
        alert("Employee Email isn't in the correct format!");
        return;
      }

      if (!(this.editEmployeeDetails.email.includes("."))) {
        alert("Employee Email isn't in the correct format!");
        return;
      }

      this.employeeDetailsServices.updateEmployeeDetailsItems(this.editEmployeeDetails.id, this.editEmployeeDetails).subscribe
        (editEmployeeDetails => {
          const nr = editEmployeeDetails ? this.employeeDetails.findIndex(n => n.id === editEmployeeDetails.id) : -1;
          if (nr > -1) {
            this.employeeDetails[nr] = editEmployeeDetails;
            alert("Employee: " + this.employeeDetails[nr].name + " Edited!");
          }
        });
      this.editEmployeeDetails = undefined;
    }
  }


}
