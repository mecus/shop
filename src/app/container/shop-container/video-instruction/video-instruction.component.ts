import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../../services/youtube.service';

@Component({
  selector: 'app-video-instruction',
  templateUrl: 'video-instruction.component.html',
  styleUrls: ['video-instruction.component.scss']
})
export class VideoInstructionComponent implements OnInit {
  instructVideo;
  youtube;
  videoD;
  videoCounter:number = 0;
  ingridents = [
    {name: "Pepper soup ginger", price: 5.90, size: "200g", image: "assets/SR_Catering_985x615-600x600.jpg"},
    {name: "Canned banga soup", price: 1.90, size: "1kg", image: "assets/deli.jpg"},
    {name: "Gind pepper", price: 2.50, size: "250g", image: "assets/deli.jpg"},
    {name: "Blended fish", price: 3.80, size: "500g", image: "assets/SR_Catering_985x615-600x600.jpg"}
  ]
  constructor(private youtubeService:YoutubeService) {
    // this.youtube = this.youtubeService.getYoutubeVideos();
    this.getVideo();
   }

  getInstruction(video){
    console.log(video['src']);
    this.videoD =video;
    this.instructVideo = video.youtube_link + "?rel=0&autoplay=1";
    this.videoCounter ++;
  }
  getVideo(){
    this.youtubeService.getYoutubeVideos()
    .subscribe((vid)=>{
      this.youtube = vid;
      this.instructVideo = vid[0].youtube_link;
      console.log(vid);
    })
  }
  ngOnInit() {
    setTimeout(()=>{
      this.getVideo();
    }, 600);
  }

}
