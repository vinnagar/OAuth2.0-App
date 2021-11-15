import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';
import { TokenStorageService } from './service/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private role: any;
  isLoggedIn = false;
  showAdminBoard = false;
  username: string;
  constructor(private tokenStorageService: TokenStorageService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.role = user.roles[0];

      console.log(this.role);

      this.showAdminBoard = this.role.includes('ADMIN','SUBADMIN');

      this.username = user.username;
    }
  }
  title = 'auth-app';

  logout(): void {
    this.authenticationService.logout(this.tokenStorageService.getUser().username)
    .subscribe(
      data =>{
        console.log(data);
      },
      err =>{
        console.log(JSON.parse(err.error).message);
      }
    );
    this.tokenStorageService.signout();
    window.location.reload();
  }
}
