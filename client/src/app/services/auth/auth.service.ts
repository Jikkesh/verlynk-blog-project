import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../../interfaces/User';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private _url: string = "http://localhost:5000/auth";
  private token: string = "";

  private userLogin$ = new Subject<boolean>();
  public userLogin: Observable<boolean> = this.userLogin$.asObservable();

  constructor(private http: HttpClient) { }

  onLogin(body: User): Observable<any> {
    return this.http.post(`${this._url}/login`, body);
  }

  onSignup(body: User): Observable<any> {
    console.log(body)
    return this.http.post(`${this._url}/signup`, body);
  }

  onUserLogin(value: boolean) {
    if (value == true) {
      this.token = localStorage.getItem("USER_TOKEN")
    }
    this.userLogin$.next(value)
  }

  getToken() : string{
    return this.token;
  }


}
