import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      // bithdate: ['', Validators.required],
      emailId : ['', [Validators.required,Validators.email]],
      role : ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]]
  });
  }

  get f() { return this.registerForm.controls; }


  onSubmit() {
    this.submitted = true;
    this.loading = true;
    console.log(this.registerForm.value);
    this.authenticationService.register(this.registerForm.value)
        .subscribe(
          data =>{
            console.log(data);
          },
          err =>{
            console.log(JSON.parse(err.error).message);
          }
        );
  }

}
