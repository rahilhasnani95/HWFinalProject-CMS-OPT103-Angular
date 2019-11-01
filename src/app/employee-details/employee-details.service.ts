import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {

  url = "http://localhost:61018/api/Admin/employees";

  constructor(private httpClient: HttpClient) { }
  getEmployeeDetailsItems(): Observable<EmployeeDetails[]> {    
    return this.httpClient.get<EmployeeDetails[]>(this.url);
  }

  deleteEmployeeDetailsItems(id: number): Observable<{}> {    
    const deleteUrl = `${this.url}/${id}`;
    return this.httpClient.delete(deleteUrl);
  }

  updateEmployeeDetailsItems(id:number, employeeDetails: EmployeeDetails): Observable<EmployeeDetails>
  {    
    const editUrl = `${this.url}/${id}`;
    return this.httpClient.put<EmployeeDetails>(editUrl,employeeDetails);
  }

  addEmployeeDetailsItems(addForm: NgForm) : Observable<{}>
  {    
    return this.httpClient.post<EmployeeDetails>(this.url, addForm);    
  }
}
