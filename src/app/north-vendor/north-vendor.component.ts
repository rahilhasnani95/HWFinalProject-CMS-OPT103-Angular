import { Component, OnInit } from '@angular/core';
import { NorthVendorService } from './north-vendor.service';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { UserService } from '../services/user.service';
import { VendorDetailsService } from '../vendor-details/vendor-details.service';


@Component({
  selector: 'app-north-vendor',
  templateUrl: './north-vendor.component.html',
  styleUrls: ['./north-vendor.component.css']
})
export class NorthVendorComponent implements OnInit {

  northVendors: NorthVendor[];
  errorMsg: any;
  editNorthItem: NorthVendor;   
  currentUser: any;
  userId: any;
  vendorId: number;


  constructor(public northVendorService: NorthVendorService, 
    private router: Router,
    private userSvc: UserService, private vendorDetailsService: VendorDetailsService) { }

  ngOnInit() {
    this.northVendorService.getNorthIndianItems().subscribe(
      data => this.northVendors = data,
      error => this.errorMsg = error
    );  

    this.userSvc.currentUser.subscribe(x => this.currentUser = x);   
    this.userId = this.currentUser.id;

    this.vendorDetailsService.getVendorDetailsItemsVendorId(this.userId).subscribe(
      (vendorData) => 
      {
        this.vendorId = vendorData;
        console.log(this.vendorId);
      });            
  }

  add(addForm: NgForm, router: Router): void {
    this.editNorthItem = undefined;
    // name = name.trim();        

    if (!addForm.value.name) {
      alert("Item Price can't be empty");
      return;
    }

    if (!addForm.value.price) {
      alert("Item Price can't be empty");
      return;
    }

    if (addForm.value.price < 0) {
      alert("Item Price can't be negative");
      return;
    }
      
    this.northVendorService.addNorthItem(addForm.value).subscribe();
    this.northVendors.push(addForm.value);
 
    alert("Menu Item: " + addForm.value.name + " Added!");  
    addForm.resetForm();
    router.navigateByUrl('/NorthIndian');      
  }

  delete(northVendor: NorthVendor): void {

    if(confirm("Are you sure you want to Delete: " + northVendor.name + " ? "))
    {      
      this.northVendors = this.northVendors.filter(n => n !== northVendor);
      this.northVendorService.deleteNorthIndianItem(northVendor.id).subscribe();  
      alert("Menu Item: " + northVendor.name + " Deleted!");
    }
       
  }
  

  edit(northVendor: NorthVendor)
  {
    this.editNorthItem = northVendor;
  }

  update() {
    if (this.editNorthItem) {
      if(this.editNorthItem.name=="")
      {
        alert("Name is required!");
        return;
      }
      if(this.editNorthItem.price==null)
      {
        alert("Price is required!");
        return;
      }
      this.northVendorService.updateNorthIndianItem(this.editNorthItem.id,this.editNorthItem).subscribe
        (editNorthItem => {
          const nr = editNorthItem ? this.northVendors.findIndex(n => n.id === editNorthItem.id) : -1;
          if (nr > -1) {
            this.northVendors[nr] = editNorthItem;
            alert("North Item: " + this.northVendors[nr].name + " Edited!");
          }
        });
      this.editNorthItem = undefined;
    }
  }      
  

}
