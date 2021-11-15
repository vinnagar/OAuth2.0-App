import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN_KEY = 'refresh-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signout(){
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    // window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY,token);
    // window.sessionStorage.removeItem(TOKEN_KEY);
    // window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public saveRefreshToken(token: string): void {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.setItem(REFRESH_TOKEN_KEY,token);
    // window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    // window.sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
    // return sessionStorage.getItem(TOKEN_KEY);
  }
  public getRefreshToken(): string {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
    // return sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public saveUser(user): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY,JSON.stringify(user));
    // window.sessionStorage.removeItem(USER_KEY);
    // window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(localStorage.getItem(USER_KEY));
    // return JSON.parse(sessionStorage.getItem(USER_KEY));
  }


}
