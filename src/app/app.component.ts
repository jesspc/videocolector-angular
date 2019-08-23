import { Component, OnInit, DoCheck } from '@angular/core';
import {UserService} from './Services/user.service';
import {User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
    title = 'videocolector-angular';
    public user: User;
    public identity;
    public token;

  constructor(
    private _userService: UserService
  ){
    this.loadUser();
  }

  ngOnInit(){
  }

  ngDoCheck(){
    this.loadUser();
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
}
