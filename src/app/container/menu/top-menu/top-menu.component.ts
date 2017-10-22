import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { WindowService } from "../../../services/window.service";
import { ClearHeighlightMenu } from "../../../services/clearfunction.service";
import { StorageService } from "../../../services/storage.service";
import { AuthService } from "../../../authentications/authentication.service";
import { CartService } from '../../../services/cart.service';


@Component({
  selector: 'app-top-menu',
  templateUrl: 'top-menu.component.html',
  styleUrls: ['top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  window;
  document;
  triger:boolean = false;
  cta:boolean = false;
  constructor(
    private windowRef:WindowService, 
    private _location:Location, 
    private _router:Router,
    private clearHeighlightMenu:ClearHeighlightMenu, 
    private storeService:StorageService,
    private cartService:CartService, 
    private authService:AuthService)
    {
    this.window = this.windowRef.getWindowObject();
    this.document = this.windowRef.getDocumentRef();
  }
  openCta(){
    this.cta = (this.cta == false? true : false);
  }
  goHome(){
    this.clearHeighlightMenu.clearMenu();
    this._router.navigate(["/"]);
  } 
  interV;
  appResetTimeOut(){
    //Remove Postcode from the storage
    if(this.storeService.retriveData('postcode')){
      setTimeout(()=>{
        this.triger = true;
        this.interV = setInterval(this.flashIcon, 2000);
      }, 500000)
      setTimeout(()=>{
        let code = this.storeService.retriveData('postcode');
        // this.cartService.removeBatchCart(code);
        this.storeService.cleardata('postcode');
        clearInterval(this.interV);
        this.triger = false;
      }, 600000)
    }
  }
  flashIcon(){
    let flash = this.document.getElementById('fashIcon');
    flash.innerHTML = `wb_sunny` || null;
    flash.style.color = "red" || null;

    setTimeout(()=>{
        flash.style.color = "lightgreen" || null;
        // flash.innerHTML = `wb_sunny`;
      }, 1000)
  }
  

  ngOnInit() {
    this.authService.authState().subscribe((state)=>{
      if(state == null){
        this.appResetTimeOut();
      }
    })
      
    
    let dom = document.getElementById('mat-toolbar');
    
    this.window.addEventListener('scroll', (e)=>{
      let yPos = this.window.pageYOffset;
      // if(yPos > 100){
      //   dom.style.display = "none";
      //   // alert("More than 300");
      // }else{
      //   dom.style.display = "block";
      // }
      // console.log(e);
    })
    // if(this.window.screenTop < 25){
    //   // alert("Screemmmm");
    //   this.window.document.body.scrollTop = 400;
    // }
  
  //Start Particlr js
  
  // this.window.particlesJS("mat-toolbar", {
  //   "particles": {
  //     "number": {
  //       "value": 88,
  //       "density": {
  //         "enable": true,
  //         "value_area": 700
  //       }
  //     },
  //     "color": {
  //       "value": ["#aa73ff", "#f8c210", "#83d238", "#33b1f8"]
  //     },
  //     "shape": {
  //       "type": "circle",
  //       "stroke": {
  //         "width": 0,
  //         "color": "#000000"
  //       },
  //       "polygon": {
  //         "nb_sides": 15
  //       }
  //     },
  //     "opacity": {
  //       "value": 0.5,
  //       "random": false,
  //       "anim": {
  //         "enable": false,
  //         "speed": 1.5,
  //         "opacity_min": 0.15,
  //         "sync": false
  //       }
  //     },
  //     "size": {
  //       "value": 2.5,
  //       "random": false,
  //       "anim": {
  //         "enable": true,
  //         "speed": 2,
  //         "size_min": 0.15,
  //         "sync": false
  //       }
  //     },
  //     "line_linked": {
  //       "enable": true,
  //       "distance": 110,
  //       "color": "#33b1f8",
  //       "opacity": 0.25,
  //       "width": 1
  //     },
  //     "move": {
  //       "enable": true,
  //       "speed": 1.6,
  //       "direction": "none",
  //       "random": false,
  //       "straight": false,
  //       "out_mode": "out",
  //       "bounce": false,
  //       "attract": {
  //         "enable": false,
  //         "rotateX": 600,
  //         "rotateY": 1200
  //       }
  //     }
  //   },
  //   "interactivity": {
  //     "detect_on": "canvas",
  //     "events": {
  //       "onhover": {
  //         "enable": false,
  //         "mode": "repulse"
  //       },
  //       "onclick": {
  //         "enable": false,
  //         "mode": "push"
  //       },
  //       "resize": true
  //     },
  //     "modes": {
  //       "grab": {
  //         "distance": 400,
  //         "line_linked": {
  //           "opacity": 1
  //         }
  //       },
  //       "bubble": {
  //         "distance": 400,
  //         "size": 40,
  //         "duration": 2,
  //         "opacity": 8,
  //         "speed": 3
  //       },
  //       "repulse": {
  //         "distance": 200,
  //         "duration": 0.4
  //       },
  //       "push": {
  //         "particles_nb": 4
  //       },
  //       "remove": {
  //         "particles_nb": 2
  //       }
  //     }
  //   },
  //   "retina_detect": true
  // });

  }
}

