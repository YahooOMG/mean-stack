import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthData } from '../models/authData.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(newUser: AuthData) {
    this.http
      .post(this.apiUrl + '/user/signup', newUser)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string) {
    this.http
      .post<{ token: string }>(this.apiUrl + '/user/login', {
        email: email,
        password: password
      })
      .subscribe(response => {
        this.token = response.token;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.router.navigate(['/']);
      });
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }
}