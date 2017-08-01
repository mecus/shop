import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { WindowService } from "app/services/window.service";
import { ClearHeighlightMenu } from "app/services/clearfunction.service";
import { StorageService } from "app/services/storage.service";
import { AuthService } from "app/authentications/authentication.service";
import { CartService } from 'app/services/cart.service';


@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  window;
  document;
  triger:boolean = false;
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
        this.cartService.removeBatchCart(code);
        this.storeService.cleardata('postcode');
        clearInterval(this.interV);
        this.triger = false;
      }, 600000)
    }
  }
  flashIcon(){
    let flash = this.document.getElementById('fashIcon');
    flash.innerHTML = `wb_sunny`;
    flash.style.color = "red";

    setTimeout(()=>{
        flash.style.color = "lightgreen";
        // flash.innerHTML = `wb_sunny`;
      }, 1000)
  }
  

  ngOnInit() {
    this.authService.authState().subscribe((state)=>{
      if(state == null){
        this.appResetTimeOut();
      }
    })
      
    
    let dom = document.getElementById('top-screen');
    
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
  }

}
