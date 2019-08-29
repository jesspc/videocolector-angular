import { Component, OnInit } from '@angular/core';
import {UserService} from '../../Services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

    public page_title: string;
    public identity;
    public token;

    constructor(
      private  _userService:UserService
    ) {
      this.page_title = "Mis videos";
    }

    ngOnInit() {
      this.loadUser();
    }

    loadUser(){
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
    }
}
