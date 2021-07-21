import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Login, Register, User, UserToken } from '../models/user.entity';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  currentUser = {} as User;
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  registerUser(register: Register): Observable<void> {
    return this.http.post<void>(this.baseUrl + 'user/register', register);
  }

  loginUser(login: Login): Observable<UserToken> {
    return this.http.post<UserToken>(this.baseUrl + 'user/login', login)
      .pipe(
        map((response: UserToken) => {
          const user = response.user;
          if (user) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(user));
            this.currentUser = user;
          }
          return response;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser = {} as User;
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      if (!this.jwtHelper.isTokenExpired(token))
        return true;
      this.logout(); // if expired
    }
    return false;
  }
}
