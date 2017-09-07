import { Directive, HostBinding, HostListener } from '@angular/core';
import { WindowService } from "../services/window.service";
import { Router, ActivatedRoute, Params } from '@angular/router';

//This Directives is Not been used yet
@Directive({
  selector: '[selectMenu]'
})
export class SelectMenuDirective {
  document;
  @HostBinding('style.display') selectMenu:string;
 
  constructor(private windowService:WindowService, private _route:ActivatedRoute) { 
    this.document = this.windowService.getDocumentRef();
  }
  @HostListener('mouseenter', ['$event']) onHoverOn(event){
    // console.log(event);
    let tab = this.document.getElementsByClassName('howTo-video');
    tab[0].style.display = "block";
  }

  @HostListener('mouseleave', ['$event']) onHoverOff(event){
    // console.log(event);
    let tab = this.document.getElementsByClassName('howTo-video');
    tab[0].style.display = "none";
  }
}
