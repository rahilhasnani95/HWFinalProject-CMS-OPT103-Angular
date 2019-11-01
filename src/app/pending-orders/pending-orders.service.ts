import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PendingOrdersService {

  constructor(private httpClient: HttpClient) { }
  
  getPendingOrdersItems(): Observable<PendingOrders[]> {
    let url = "./assets/data/PendingOrders.json";
    return this.httpClient.get<PendingOrders[]>(url);
  }
  deletetPendingOrdersItems(name: string): Observable<{}> {
    let url = "./assets/data/PendingOrders.json";
    const deleteUrl = `${url}/${name}`;
    return this.httpClient.delete(deleteUrl);
  }
  updatetPendingOrdersItems(pendingOrders: PendingOrders): Observable<PendingOrders>
  {
    let url = "./assets/data/PendingOrders.json";
    return this.httpClient.put<PendingOrders>(url, pendingOrders);

  }

}