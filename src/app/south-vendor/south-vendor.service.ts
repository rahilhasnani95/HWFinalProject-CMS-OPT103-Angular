import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SouthVendorService {

  url= "http://localhost:61018/api/VendorMenu/southmenu";

  constructor(public httpClient : HttpClient) { 

  }

  getSouthItems(): Observable<SouthVendor[]>
  {
    return this.httpClient.get<SouthVendor[]>(this.url)
  }

  deleteSouthItem(id : number) : Observable<{}>
  {
    const deleteurl = `${this.url}/${id}`;
    return this.httpClient.delete(deleteurl);
  }

  updateSouthItem(id: number, southVendor: SouthVendor): Observable<SouthVendor> {
    const editUrl = `${this.url}/${id}`;
    return this.httpClient.put<SouthVendor>(editUrl, southVendor);
  }

  addSouthItem(southVendor: SouthVendor): Observable<SouthVendor>{ 
    return this.httpClient.post<SouthVendor>(this.url, southVendor);
  }
}
