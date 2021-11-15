import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginUser } from '../module/LoginUser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private host = environment.apiUrl;
  private headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(private http : HttpClient) { }

  login (loginUser : LoginUser): Observable<any> {

    return this.http.post<HttpResponse<any> | HttpErrorResponse>(`${this.host}/api/auth/signin`, loginUser, {observe:'response'});

  }

  register(user): Observable<any>{
    return this.http.post<any>(`${this.host}/api/auth/signup`, user, {observe:'response'});
  }

  logout (username): Observable<any> {

    console.log(username);

    const param = new HttpParams()
    .set('username', username);

    return this.http.get<any>(`${this.host}/api/auth/logout`, {params: param});

  }

}
