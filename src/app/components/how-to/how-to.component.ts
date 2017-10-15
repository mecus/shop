import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { YoutubeService } from "../../services/youtube.service";



@Component({
  selector: 'how-to',
  templateUrl: 'how-to.component.html',
  styleUrls: ['how-to.component.scss']
})
export class HowToComponent implements OnInit {
  youtube;
  controls:string;
  constructor(private youtubeService:YoutubeService) {
    this.controls = "/?rel=0&amp;controls=0&amp;showinfo=0";
    this.youtube = this.youtubeService.getYoutubeVideos();
   }
   viewYoutube(video){
     alert(video.youtube_link);
   }

  ngOnInit() {

  }

}
