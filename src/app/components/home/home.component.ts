import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../Services/user.service';
import {VideoService} from '../../Services/video.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[UserService, VideoService]
})
export class HomeComponent implements OnInit {

    public page_title: string;
    public identity;
    public token;
    public status;
    public videos;
    public page;
    public prev_page;
    public next_page;
    public number_pages;

    constructor(
      private  _userService: UserService,
      private  _videoService: VideoService,
      private  _route: ActivatedRoute,
      private  _router: Router,

    ) {
      this.page_title = "Mis videos";
      this.prev_page = 1;
      this.next_page = 2;

    }

    ngOnInit() {
      this.loadUser();
      this.actualPageVideo();

      this._route.params.subscribe(params =>{
        var page = +params['page'];
          if(!page){
            page = 1;
            this.prev_page = 1;
            this.next_page = 2;
          }
       this.getVideos(page);
      });
    }

    // metodo para quedar en la pagina list luego de borrar
    actualPageVideo(){
      this._route.params.subscribe(params =>{
        var page = +params['page'];
        if(!page){
          page = 1;
          this.prev_page = 1;
          this.next_page = 2;
        }
        this.getVideos(page);
      });
    }


    loadUser(){
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
    }

    getVideos(page){
      this._videoService.getVideos(this.token, page).subscribe(
        response =>{
          this.videos = response.videos;

          var number_pages = [];
          for (let i = 1; i <= response.total_page; i++){
            number_pages.push(i);
          }
          this.number_pages = number_pages;

            if(page >=2){
              this.prev_page = page - 1;
            }else{
              this.prev_page = 1;
            }

            if( page < response.total_page){
              this.next_page = page + 1;
            }else {
              this.next_page = response.total_page;
            }
        },
        error =>{
          status = 'error';
          console.log(error);
        }
      );
    }


    getThumb(url, size) {
      var video, results, thumburl;

      if (url === null) {
        return '';
      }

      results = url.match('[\\?&]v=([^&#]*)');
      video   = (results === null) ? url : results[1];

      if(size != null) {
        thumburl = 'http://img.youtube.com/vi/' + video + '/'+ size +'.jpg';
      }else{
        thumburl = 'http://img.youtube.com/vi/' + video + '/mqdefault.jpg';
      }

      return thumburl;

  }


  deleteVideo(id){
      this._videoService.delete(this.token, id).subscribe(
        response => {
          this.actualPageVideo();

        },
        error => {
          console.log(error);
        });
  }
}
