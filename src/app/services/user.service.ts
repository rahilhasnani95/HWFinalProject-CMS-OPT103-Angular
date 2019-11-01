import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    readonly API_URL: string = "http://localhost:61018/api/auth";
    userSubject: BehaviorSubject<any>;
    currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        this.userSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.userSubject.asObservable();
    }


    register(user: User): Observable<User> {
        let options = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
        return this.http.post<User>(`${this.API_URL}/register`, user, options);
    }

    validate(username: string, password: string): Observable<any> {
        let loginData = {
            username, password
        }
        let options = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }
        return this.http.post<any>(`${this.API_URL}/token`, loginData, options);
    }

    saveUserState(userState: any) {
        localStorage.setItem("currentUser", JSON.stringify(userState));      
        this.userSubject.next(userState);
    }

    public get CurrentUser() {
        return this.userSubject.value;
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.userSubject.next(null);
    }

}
