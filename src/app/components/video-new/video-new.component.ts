import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../Services/user.service';
import {VideoService} from '../../Services/video.service';
import {Video} from '../../models/video';

@Component({
  selector: 'app-video-new',
  templateUrl: './video-new.component.html',
  styleUrls: ['./video-new.component.css'],
  providers: [UserService, VideoService]

})
export class VideoNewComponent implements OnInit {

  public page_title:string;
  public identity;
  public token;
  public video: Video;
  public status;


  constructor(
    private _userService: UserService,
    private _router: Router,
    private  _route: ActivatedRoute,
    private  _videoService:VideoService
  ) {

    this.page_title = "Guardar nuevo video";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    this.video = new Video(1, this.identity.sub, '','','','',null, null);
  }

  onSubmit(form){
    this._videoService.create(this.token, this.video).subscribe(
      response =>{
          this.status ='success'
            if(response.status == 'success'){
                this.status ='success';
                this._router.navigate(['/inicio']);
            }else {
                this.status = 'error';
            }
      },
      error =>{
          this.status = 'error';
          console.log(error);
      }
    );
  }

}
