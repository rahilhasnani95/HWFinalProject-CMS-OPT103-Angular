import { Component, OnInit } from '@angular/core';
import { IndoChinsesVendorService } from './indo-chinses-vendor.service';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { UserService } from '../services/user.service';
import { VendorDetailsService } from '../vendor-details/vendor-details.service';

@Component({
  selector: 'app-indo-chinses-vendor',
  templateUrl: './indo-chinses-vendor.component.html',
  styleUrls: ['./indo-chinses-vendor.component.css']
})
export class IndoChinsesVendorComponent implements OnInit {

  indoVendors: IndoVendor[];
  errorMsg: any;
  editIndoItem: IndoVendor;
  currentUser: any;
  userId: any;
  vendorId: number;

  constructor(public indoVendorService: IndoChinsesVendorService,
    private router: Router,
    private userSvc: UserService, 
    private vendorDetailsService: VendorDetailsService) { }

  ngOnInit() {
    this.indoVendorService.getIndoChinsesIndianItems().subscribe(
      data => this.indoVendors = data,
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
    this.editIndoItem = undefined;
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

    this.indoVendorService.addNorthItem(addForm.value).subscribe();  
    this.indoVendors.push(addForm.value);
 
    alert("Menu Item: " + addForm.value.name + " Added!");  
    addForm.resetForm();  
    router.navigateByUrl('/IndoChinese');    
  }

  delete(indoVendor: IndoVendor): void {
    if(confirm("Are you sure to delete " + indoVendor.name +"?"))
    {
      this.indoVendors = this.indoVendors.filter(n => n !== indoVendor);
      this.indoVendorService.deleteIndoChinsesIndianItems(indoVendor.id).subscribe();  
      alert("Menu Item: " + indoVendor.name + " Deleted!");   
    }  
  }

  edit(indoVendor: IndoVendor)
  {
    this.editIndoItem = indoVendor;
  }

  update() {
    if (this.editIndoItem) {
      if(this.editIndoItem.name=="")
      {
        alert("Name is required!");
        return;
      }
      if(this.editIndoItem.price== null)
      {
        alert("Price is required!");
        return;
      }
      this.indoVendorService.updateIndoChinsesIndianItems(this.editIndoItem.id,this.editIndoItem).subscribe
        (editIndoItem => {
          const nr = editIndoItem ? this.indoVendors.findIndex(n => n.id === editIndoItem.id) : -1;
          if (nr > -1) {
            this.indoVendors[nr] = editIndoItem;
            alert("Indo Chinese Item: " + this.indoVendors[nr].name + " Edited!");
          }
        });
      this.editIndoItem = undefined;
    }
  }


}
