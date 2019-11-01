import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart[];
  errorMsg : any;
  total: number;

  constructor(public cartService : CartService) { }

  //view cart
  ngOnInit() {
    //need changes for multiple emp
      this.cartService.viewMyCarts(1).subscribe(
        data => this.cart = data
      )
    }

    //delete from cart
  deleteItem(cart: Cart, router : Router) : void
  {
    if(confirm("Are you sure to delete " + cart.name + "?"))
    {
      this.total = this.total - cart.price;
      this.cart = this.cart.filter(n => n !== cart);
      this.cartService.deleteItemFromCart(cart.id).subscribe();
      router.navigateByUrl('/Cart'); //reloads the page to get refreshed data
      alert("Item : "+ cart.name + " Deleted!");
    }
  }

  getSum() : number {
    let sum = 0;
    for(let i = 0; i < this.cart.length; i++) {
      sum = sum + this.cart[i].price;
    }
    return sum;
  }

    //checkout and edit balance
    checkOut(empId: number, router: Router) {
      // if (this.total > this.empBalance) {
      //   alert("Sorry ! You have insufficient balance to place this order")
      // }
      // else {

        this.cartService.checkOut(empId).subscribe();
        alert("Thanks for you order | Your token number is 111 | " + "Total amount is " + this.getSum() + " | Estimated time : 30 mins");

        location = location;
       
        
    }
  

}
