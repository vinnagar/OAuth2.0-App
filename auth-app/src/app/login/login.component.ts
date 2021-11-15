import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { LoginUser } from '../module/LoginUser';
import { throwError } from 'rxjs';
import { TokenStorageService } from '../service/token-storage.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUser : LoginUser;
  isLoggedIn = false;
  isError = false;
  roles : string[]  = [];
  loginForm = new FormGroup({
    username : new FormControl("", Validators.required),
    password : new FormControl("", Validators.required)
  })

  constructor(private authService: AuthenticationService, private router: Router, private formBuilder: FormBuilder,
     private tokenStorage : TokenStorageService) {
    this.loginUser = {
      password : ' ',
      username : ' '
    }
   }

  get username(){
    return this.loginForm.get('username');
  }
  get password(){
    return this.loginForm.get('password');
  }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()){
      this.isLoggedIn = true;

      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigate(['/user']);
    }

  }

  login(){
    this.loginUser.username = this.username.value;
    this.loginUser.password = this.password.value;

    this.authService.login(this.loginUser)
                    .subscribe(data =>{
                      this.isError = false;
                      this.tokenStorage.saveToken(data.body.accessToken);
                      this.tokenStorage.saveRefreshToken(data.body.refreshToken);
                      this.tokenStorage.saveUser(data.body);
                      this.isLoggedIn = true;
                      this.roles = this.tokenStorage.getUser().roles;
                      console.log(data);
                      this.reloadPage();
                    },
                    error => {
                      this.isError = true;
                      throwError(error);
                    }
                    );

  }

  reloadPage(): void {
    window.location.reload();
  }

}
