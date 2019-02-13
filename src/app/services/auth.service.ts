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
  private username: string;
  private tokenTimer: any;
  private expirationDate: any;
  private authStatusListener = new Subject<boolean>();
  private usernameListener = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getUsername() {
    return this.username;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUsernameListener() {
    return this.usernameListener.asObservable();
  }

  createUser(newUser: AuthData) {
    this.http
      .post(this.apiUrl + '/user/signup', newUser)
      .subscribe(response => {
        this.login(newUser.email, newUser.password);
      });
  }

  login(email: string, password: string) {
    this.http
      .post<{ token: string; expiresIn: number, username: string }>(this.apiUrl + '/user/login', {
        email: email,
        password: password
      })
      .subscribe(response => {
        this.token = response.token;
        if (this.token) {
          this.username = response.username;
          const expiresIn = response.expiresIn;
          this.setAuthTimer(expiresIn);
          this.isAuthenticated = true;
          this.expirationDate = new Date().getTime() + expiresIn * 1000;
          this.saveTokenData(response.token, this.expirationDate, response.username);
          this.authStatusListener.next(true);
          this.usernameListener.next(this.username);
          this.router.navigate(['/']);
        }
      });
  }

  autoAuthUser() {
    const tokenInformation = this.getTokenData();
    if (!tokenInformation) {
      return;
    }
    const expiresIn =
      tokenInformation.expirationDate.getTime() - new Date().getTime();
    if (expiresIn > 0) {
      this.token = tokenInformation.token;
      this.isAuthenticated = true;
      this.username = localStorage.getItem('username');
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.clearTokenData();
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveTokenData(token: string, expirationDate: Date, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', new Date(expirationDate).toISOString());
    localStorage.setItem('username', username);
  }

  private clearTokenData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('username');
  }

  private getTokenData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const username = localStorage.getItem('username');

    if (!token && !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      username: username
    };
  }
}
