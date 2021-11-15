import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host = environment.apiUrl;

  constructor(private http : HttpClient, private tokens : TokenStorageService) { }

  getAllUsers() : Observable<any>{
    console.log("dsgdfbdfhb");
    return this.http.get<any>(`${this.host}/api/users`);
  }

  getUser(name : string) : Observable<any>{
    const param = new HttpParams()
                      .set('username', name);
    
    return this.http.get<any>(`${this.host}/api/user`, {params: param});
  }

}
