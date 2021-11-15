import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  test : any = '';
  constructor(private userService : UserService, private token: TokenStorageService) { }

  ngOnInit(): void {

    this.userService.getUser(this.token.getUser().username).subscribe(
      data =>{
        console.log(data);
        this.test = data;
      },
      err => {
        console.log(JSON.parse(err.error).message);
      }
    );

  }
}
