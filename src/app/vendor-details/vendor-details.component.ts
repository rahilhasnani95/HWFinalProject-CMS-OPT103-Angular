import { Component, OnInit } from '@angular/core';
import { VendorDetailsService } from './vendor-details.service';
import { NgForm } from '@angular/forms';
import {Router} from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.css']
})
export class VendorDetailsComponent implements OnInit {
 
   vendorDetails: VendorDetails[];
   errorMsg: any;
   editVendorDetails: VendorDetails;
   currentUser: any;
   userId: any;

  constructor(public vendorDetailsService: VendorDetailsService,
    private router: Router,   
    private userSvc: UserService) { }

  ngOnInit() {
    this.vendorDetailsService.getVendorDetailsItems().subscribe(
      data => this.vendorDetails = data,
      error => this.errorMsg = error
    );

    this.userSvc.currentUser.subscribe(x => this.currentUser = x);   
    this.userId = this.currentUser.id;
  }

  delete(vendorDetails: VendorDetails, router: Router): void 
  {
    if (confirm("Are you sure you want to delete: " + vendorDetails.name + "?"))
    {
      this.vendorDetails = this.vendorDetails.filter(v => v !== vendorDetails);
      this.vendorDetailsService.deleteVendorDetailsItems(vendorDetails.id).subscribe();
      router.navigateByUrl('/VendorDetails');  
      alert("Vendor:" + vendorDetails.name + " Deleted!");
    }
  }  

  
  add(addForm: NgForm, router: Router)
  {
    this.editVendorDetails = undefined;      

    if(addForm.value.balance < 0)
    {
        alert("Employee Balance can't be Negative");
        return;
    }   

    if(addForm.value.balance == 0)
    {
        alert("Employee Balance can't be Zero");
        return;
    }     

    this.vendorDetailsService.addVendorDetailsItems(addForm.value).subscribe();    
    this.vendorDetails.push(addForm.value);
    //console.log(this.vendorDetails);    
    alert("New Vendor: " + addForm.value.name + " Added!");      
    addForm.resetForm();     
    router.navigateByUrl('/VendorDetails');    
  }  
  
  edit(vendorDetails: VendorDetails)
  {
    this.editVendorDetails = vendorDetails;
  }

  update()
  {
    if(this.editVendorDetails)
    {
      if (this.editVendorDetails.imageUrl == "") {
        alert("Image Url is required!");
        return;
      }

      if (this.editVendorDetails.name == "") {
        alert("Vendor Name is required!");
        return;
      }

      if (this.editVendorDetails.cuisine== "") {
        alert("Vendor Cuisine is required!");
        return;
      }

      if (this.editVendorDetails.contact == "") {
        alert("Vendor Contact is required!");
        return;
      }

      if (!(this.editVendorDetails.contact.length==12)) {
        //console.log(this.editVendorDetails.contact.length);
        alert("Vendor Contact must be 12 characters in length in the format: ***-***-****");
        return;
      }

      if (this.editVendorDetails.email == "") {
        alert("Vendor Email is required!");
        return;
      }

      if (!(this.editVendorDetails.email.includes("@"))) {
        alert("Vendor Email isn't in the correct format!");
        return;
      }

      if (!(this.editVendorDetails.email.includes("."))) {
        alert("Vendor Email isn't in the correct format!");
        return;
      }

      this.vendorDetailsService.updateVendorDetailsItems(this.editVendorDetails.id, this.editVendorDetails).subscribe
      (editVendorDetails => {
        const nr = editVendorDetails ? this.vendorDetails.findIndex(n=> n.id === editVendorDetails.id) : -1;
        if(nr > -1){
          this.vendorDetails[nr] = editVendorDetails;
          alert("Vendor: " + this.vendorDetails[nr].name + " Edited!"); 
        }
      });
      this.editVendorDetails = undefined;
    }
  }
  
}