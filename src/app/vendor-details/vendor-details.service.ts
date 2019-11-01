import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VendorDetailsService {

  url = "http://localhost:61018/api/Admin/vendors";

  constructor(private httpClient: HttpClient) { }

  getVendorDetailsItems(): Observable<VendorDetails[]> {    
    return this.httpClient.get<VendorDetails[]>(this.url);
  }

  deleteVendorDetailsItems(id: number): Observable<{}> {    
    const deleteUrl = `${this.url}/${id}`;
    return this.httpClient.delete(deleteUrl);
  }

  updateVendorDetailsItems(id: number, vendorDetails: VendorDetails): Observable<VendorDetails>
  {    
    const editUrl = `${this.url}/${id}`;
    return this.httpClient.put<VendorDetails>(editUrl, vendorDetails);
  } 

  addVendorDetailsItems(addForm: NgForm) : Observable<{}>
  {    
    return this.httpClient.post<VendorDetails>(this.url, addForm);    
  }  

  getVendorDetailsItemsVendorId(userId: number): Observable<number> {    
    const findUrl = `${this.url}/user/${userId}`;
    return this.httpClient.get<number>(findUrl);
  }

}
