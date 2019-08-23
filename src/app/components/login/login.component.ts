import { Component, OnInit  } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../Services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {
    public page_title: string;
    public user: User;
    public identity: string;
    public token: string;
    public status: string;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = "Identifícate";
    this.user = new User(1, '','','','','ROLE_USSER','');
  }

  ngOnInit() {
    this.logout();
  }

  onSubmit(form){
    this._userService.singup(this.user).subscribe(
       response =>{
           if(!this.status || this.status != 'error'){
            this.status = 'success';
            this.identity = response;

            //sacar el token---------
                this._userService.singup(this.user, true).subscribe(
                   response =>{
                     if(!this.status || this.status != 'error'){
                      this.status = 'success';
                      this.token = response;

                       console.log(this.identity);
                       console.log(this.token);

                       localStorage.setItem('token', this.token);
                       localStorage.setItem('identity', JSON.stringify(this.token));

                       this._router.navigate(['/inicio']);


                     }else{
                       this.status = 'error';
                     }
                   },
                   error => {
                    console.log(error);
                    this.status = 'error';
                   }
                 );

          }else{
             this.status = 'error';
          }
       },
        error => {
         console.log(error);
         this.status = 'error';
       }
    );
  }

  logout(){
    this._route.params.subscribe(params =>{
        let sure = +params['sure'];
        if(sure == 1){
           localStorage.removeItem('identity');
           localStorage.removeItem('token');

           this.identity = null;
           this.token = null;

           this._router.navigate(['/inicio']);
        }
    });
  }
}
