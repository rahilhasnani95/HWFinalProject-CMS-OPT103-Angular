import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { NgForOf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeMenu: EmployeeMenu[];
  indoMenu: IndoVendor[];
  northMenu: NorthVendor[];
  southMenu: SouthVendor[];
  empProfile: EmployeeProfile[];
  errorMsg: any;
  list1: IndoVendor[] = [];
  list2: SouthVendor[] = [];
  list3: NorthVendor[] = [];

  list: EmployeeMenu[] = [];
  total: number = 0.0;
  empBalance: number = 50;
  amount: number;
  data: any;
  empid: number = 1;
  eid: any;
  constructor(public employeeService: EmployeeService, public router: Router) { }

  ngOnInit() {

    sessionStorage.setItem('empid', this.empid.toString());
    this.eid = sessionStorage.getItem('empid');
    console.log(this.eid);

    this.employeeService.getSouthMenu().subscribe(
      data => this.southMenu = data,
      error => this.errorMsg = error,
    );

    this.employeeService.getNorthMenu().subscribe(
      data => this.northMenu = data,
      error => this.errorMsg = error
    );

    this.employeeService.getIndoMenu().subscribe(
      data => this.indoMenu = data,
      error => this.errorMsg = error
    );
  }

  //add to cart 
  add1(indo: IndoVendor) {
    indo.empId = this.eid;
    console.log(indo.empId);
    this.total = this.total + indo.price;
    this.employeeService.addToCart1(indo).subscribe();
    alert("Item " + indo.name + " Added to Cart!");
  }

  add2(south: SouthVendor) {
    south.empId = this.eid;
    console.log(south.empId);
    this.total = this.total + south.price;
    this.employeeService.addToCart2(south).subscribe();
    alert("Item " + south.name + " Added to Cart!");
  }

  add3(north: NorthVendor) {
    north.empId = this.eid;
    console.log(north.empId);
    this.total = this.total + north.price;
    this.employeeService.addToCart3(north).subscribe();
    alert("Item " + north.name + " Added to Cart!");
  }

  //add money to wallet
  addBalance(amount: number) {
    if (this.amount < 0) {
      alert("Amount cannot be negative");
    }
    else if (!this.amount) {
      alert("amount cant be empty");
      return;
    }
    else {
        this.employeeService.addBalance(amount).subscribe();
        alert("Amount Added : " + amount);
      
    }

  }

}
