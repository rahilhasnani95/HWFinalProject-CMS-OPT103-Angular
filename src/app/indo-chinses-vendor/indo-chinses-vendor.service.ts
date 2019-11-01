import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndoChinsesVendorService {
url="http://localhost:61018/api/VendorMenu/indomenu";
  constructor(private httpClient: HttpClient) { }

  getIndoChinsesIndianItems(): Observable<IndoVendor[]> {
    return this.httpClient.get<IndoVendor[]>(this.url);
  }

  deleteIndoChinsesIndianItems(id: number): Observable<{}> {
   
    const deleteUrl = `${this.url}/${id}`;
    return this.httpClient.delete(deleteUrl);
  }

  updateIndoChinsesIndianItems(id:number, indoVendor: IndoVendor): Observable<IndoVendor>
  {
    const editUrl = `${this.url}/${id}`;
    return this.httpClient.put<IndoVendor>(editUrl, indoVendor);

  }
  addNorthItem(northVendor: NorthVendor): Observable<NorthVendor>{
    return this.httpClient.post<NorthVendor>(this.url, northVendor);
  }
}