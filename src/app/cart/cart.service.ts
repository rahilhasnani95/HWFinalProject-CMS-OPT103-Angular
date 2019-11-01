import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  constructor(public httpClient : HttpClient) { }

  viewMyCarts(id: number) : Observable<Cart[]>
  {
   let url = "http://localhost:61018/api/Cart/cart"
   const viewUrl = `${url}/${id}`;
   return this.httpClient.get<Cart[]>(viewUrl);
  }

  // deletetEmployeeDetailsItems(name: string): Observable<{}> {
  //   let url = "./assets/data/EmployeeDetails.json";
  //   const deleteUrl = `${url}/${name}`;
  //   return this.httpClient.delete(deleteUrl);
  // }

  deleteItemFromCart(id: number): Observable<{}> {
    let url = "http://localhost:61018/api/Cart/cart";
    const deleteUrl = `${url}/${id}`;
    return this.httpClient.delete(deleteUrl);
  }

  checkOut(empId: number): Observable<{}> {
    let url = "http://localhost:61018/api/Cart/checkout";
    const checkoutUrl = `${url}/${empId}`
    return this.httpClient.delete(checkoutUrl);
  }
  
}
