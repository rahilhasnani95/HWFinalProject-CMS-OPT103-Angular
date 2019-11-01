import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class NorthVendorService {
 url="http://localhost:61018/api/VendorMenu/northmenu";

  constructor(private httpClient: HttpClient) { }

  getNorthIndianItems(): Observable<NorthVendor[]> {              
    return this.httpClient.get<NorthVendor[]>(this.url);    
  } 

  deleteNorthIndianItem(id: number): Observable<{}> {  
    const deleteUrl = `${this.url}/${id}`;     
    return this.httpClient.delete(deleteUrl);         
  }

  updateNorthIndianItem(id: number, northVendor: NorthVendor): Observable<NorthVendor> {
    const editUrl = `${this.url}/${id}`;  
    return this.httpClient.put<NorthVendor>(editUrl, northVendor);
  }

  addNorthItem(northVendor: NorthVendor): Observable<NorthVendor>
  {
    return this.httpClient.post<NorthVendor>(this.url, northVendor)
  }



}
