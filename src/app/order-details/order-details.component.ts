import { Component, OnInit } from '@angular/core';
import { OrderDetailsService } from './order-details.service';
import { compilePipeFromMetadata } from '@angular/compiler';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
 
   orderDetails: OrderDetails[];
   errorMsg: any;
   editOrderDetails: OrderDetails;

  constructor(public orderDetailsService: OrderDetailsService) { }

  ngOnInit() {
    this.orderDetailsService.getOrderDetailsItems().subscribe(
      data => this.orderDetails = data,
      error => this.errorMsg = error
    );
  }
  // add(addForm: NgForm): void 
  // {
  //   this.editVendorDetails = undefined;
  //   // name = name.trim();    
  //   if (!addForm.value.name) {
  //     return;
  //   }

  //   if (!addForm.value.cuisine) {
  //     return;
  //   }

  //   // The server will generate the id for this new North Indian Item
  //   // const newNorthItem: NorthVendor = { name, price } as NorthVendor;
  //   // this.northVendorService.addNorthIndianItem(newNorthItem)
  //   //   .subscribe(north => {this.northVendors.push(north), console.log(north)},
  //   //   error => this.errorMsg = error);
        
  //   this.vendorDetails.push(addForm.value);
  //   console.log(this.vendorDetails);
  //   alert("New Vendor: " + addForm.value.name + " Added!");  
  //   addForm.resetForm();
    
      
  // }
  delete(orderDetails: OrderDetails): void {
    if (confirm("Are you sure to delete" + orderDetails.name + "?"))
    {
      this.orderDetails = this.orderDetails.filter(n => n !== orderDetails);
      this.orderDetailsService.deletetOrderDetailsItems(orderDetails.name).subscribe();
      alert("Order:" + orderDetails.name + " Deleted!");
    }
  }
  edit(orderDetails: OrderDetails)
  {
    this.editOrderDetails = orderDetails;
  }
  update()
  {
    if(this.editOrderDetails)
    {
      this.orderDetailsService.updatetOrderDetailsItems(this.editOrderDetails).subscribe
      (editOrderDetails => {
        const nr = editOrderDetails ? this.orderDetails.findIndex(n=> n.name === editOrderDetails.name) : -1;
        if(nr > -1){
          this.orderDetails[nr] = editOrderDetails;
        }
      });
      this.editOrderDetails = undefined;
    }
  }

}
