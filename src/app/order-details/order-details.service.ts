import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  constructor(private httpClient: HttpClient) { }
  
  getOrderDetailsItems(): Observable<OrderDetails[]> {
    let url = "./assets/data/OrderDetails.json";
    return this.httpClient.get<OrderDetails[]>(url);
  }
  deletetOrderDetailsItems(name: string): Observable<{}> {
    let url = "./assets/data/OrderDetails.json";
    const deleteUrl = `${url}/${name}`;
    return this.httpClient.delete(deleteUrl);
  }
  updatetOrderDetailsItems(orderDetails: OrderDetails): Observable<OrderDetails>
  {
    let url = "./assets/data/OrderDetails.json";
    return this.httpClient.put<OrderDetails>(url, orderDetails);

  }

}
