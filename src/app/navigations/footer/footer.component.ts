import { Component, OnInit } from '@angular/core';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'footer-menu',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.scss']
})
export class FooterComponent implements OnInit {
  window; document;
  constructor(private windowService:WindowService) { 
    this.window = windowService.getWindowObject();
    this.document = windowService.getDocumentRef();
  }

  ngOnInit() {
    // console.log(this.window);
    // let topY = this.document.querySelector('.go-top-container');
    //  this.window.addEventListener('scroll', (e)=>{
    //   let yPos = this.window.pageYOffset;
    //   if(yPos > 500){
    //     // console.log(e);
    //     topY.style.display = "block";
    //   }else{
    //     topY.style.display = "none";
    //   }
    // });

  }
  goTop(){
    this.window.scrollTo(0, 0);
    // let yPos = this.window.pageYOffset;
    // let domE = this.document.querySelector('#top-screen');
    // domE.style.position = "relative";
    // domE.style.top = "0px";
    // console.log(domE);
    // yPos = 0;
    // this.window.addEventListener('scroll', (e)=>{
    //   let yPos = this.window.pageYOffset;
    //   if(yPos > 200){
    //     console.log(e);
    //   }
    // })
  }

}
