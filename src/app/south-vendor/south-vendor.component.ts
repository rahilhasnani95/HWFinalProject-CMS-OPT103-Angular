import { Component, OnInit } from '@angular/core';
import { SouthVendorService } from './south-vendor.service';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { UserService } from '../services/user.service';
import { VendorDetailsService } from '../vendor-details/vendor-details.service';


@Component({
  selector: 'app-south-vendor',
  templateUrl: './south-vendor.component.html',
  styleUrls: ['./south-vendor.component.css']
})
export class SouthVendorComponent implements OnInit {

  southVendors: SouthVendor[];
  errorMsg : any;
  editSouthItem: SouthVendor;
  currentUser: any;
  userId: any;
  vendorId: number;

  constructor(public southService : SouthVendorService,
    private router: Router,
    private userSvc: UserService, 
    private vendorDetailsService: VendorDetailsService) { }

  ngOnInit() {
    this.southService.getSouthItems().subscribe(
      data => this.southVendors = data,
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
    this.editSouthItem = undefined;
    console.log(addForm.value);
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

        
    this.southService.addSouthItem(addForm.value).subscribe();
    this.southVendors.push(addForm.value);
   
    alert("Menu Item: " + addForm.value.name + " Added!");  
    addForm.resetForm();    
    router.navigateByUrl('/SouthIndian');  
  }

  delete(southVendor : SouthVendor) : void
  {
    if(confirm("Are you sure to delete "+ southVendor.name + "?")) {

    this.southVendors = this.southVendors.filter(s => s !== southVendor);
    this.southService.deleteSouthItem(southVendor.id).subscribe();
    alert("Menu Item: " + southVendor.name + " Deleted!"); 
    }
  }

  edit(southVendor : SouthVendor)
  {
    this.editSouthItem = southVendor;
  }

  update() {
    if (this.editSouthItem)
     {
       if(this.editSouthItem.name== "")
       {
         alert("Name is required!");
         return;
       }
       if(this.editSouthItem.price== null)
       {
        alert("Price is required!");
        return;
       }
      this.southService.updateSouthItem(this.editSouthItem.id,this.editSouthItem).subscribe
        (editSouthItem => {
          const nr = editSouthItem ? this.southVendors.findIndex(n => n.id === editSouthItem.id) : -1;
          if (nr > -1) {
            this.southVendors[nr] = editSouthItem;
            alert("South Item: " + this.southVendors[nr].name + " Edited!");
          }
        });
      this.editSouthItem = undefined;
    }
  }

  
}
