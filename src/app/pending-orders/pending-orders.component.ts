import { Component, OnInit } from '@angular/core';
import { PendingOrdersService } from './pending-orders.service';

@Component({
  selector: 'app-pending-orders',
  templateUrl: './pending-orders.component.html',
  styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent implements OnInit {
  pendingOrders: PendingOrders[];
  errorMsg: any;
  editPendingOrder: PendingOrders;


  constructor(public pendingOrderService: PendingOrdersService) { }

  ngOnInit() {
    this.pendingOrderService.getPendingOrdersItems().subscribe(
      data => this.pendingOrders = data,
      error => this.errorMsg = error

    );
  }
  delete(pendingOrders: PendingOrders): void{
    if(confirm("Are you sure to deny " + pendingOrders.name+ "'s Order?"))
    {
      this.pendingOrders = this.pendingOrders.filter(n => n !== pendingOrders);
      this.pendingOrderService.deletetPendingOrdersItems(pendingOrders.name).subscribe();
      alert( pendingOrders.name + "'s Order Denied!");
    }
  }
  edit(pendingOrders: PendingOrders): void{
    
      this.pendingOrders = this.pendingOrders.filter(n => n !== pendingOrders);
      this.pendingOrderService.deletetPendingOrdersItems(pendingOrders.name).subscribe();
      alert(pendingOrders.name + "'s Order Accepted!");
    
  }

}
