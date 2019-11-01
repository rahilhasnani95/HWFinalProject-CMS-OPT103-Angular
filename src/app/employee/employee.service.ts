import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public httpClient: HttpClient) { }

  getIndoMenu(): Observable<IndoVendor[]> {
    let url = "http://localhost:61018/api/Employee/indomenu"
    return this.httpClient.get<IndoVendor[]>(url);
  }

  getSouthMenu(): Observable<SouthVendor[]> {
    let url = "http://localhost:61018/api/Employee/southmenu"
    return this.httpClient.get<SouthVendor[]>(url);
  }

  getNorthMenu(): Observable<NorthVendor[]> {
    let url = "http://localhost:61018/api/Employee/northmenu"
    return this.httpClient.get<NorthVendor[]>(url);
  }


  addToCart1(indo: IndoVendor): Observable<{}> {
    let url = "http://localhost:61018/api/Cart/addtocart";
    return this.httpClient.post<Cart>(url, indo);
  }

  addToCart2(south: SouthVendor): Observable<{}> {
    let url = "http://localhost:61018/api/Cart/addtocart"
    return this.httpClient.post<Cart>(url, south);
  }

  addToCart3(north: NorthVendor): Observable<{}> {
    let url = "http://localhost:61018/api/Cart/addtocart"
    return this.httpClient.post<Cart>(url, north);
  }

  addBalance(amount: number): Observable<{}>
  {
     let url = "http://localhost:61018/api/Cart/balance"
     const addUrl = `${url}/${amount}`;
     return this.httpClient.put<EmployeeProfile>(addUrl, amount);
   }

  // getBalances(empid: number) : Observable<{}>
  // {
  //    let url = "http://localhost:56611/api/Employee/mybalance"
  //    const getUrl = `${url}/${empid}`;
  //    return this.httpClient.get(getUrl);
  // }

}
