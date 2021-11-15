import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../service/token-storage.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users : any = '';
  displayedColumns: string[] = ['username', 'firstname', 'lastname', 'emailId', 'bithdate'];

  constructor(private userService : UserService, private token: TokenStorageService) { }

  ngOnInit(): void {

    this.userService.getAllUsers().subscribe(
      data =>{
        this.users = data;
        console.log(this.users);
      },
      err =>{
        console.log(JSON.parse(err.error).message);
      }
    )
  }

}
