import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[hoverMenu]'
})
export class HoverMenuDirective {
  @Input() active;
  @HostBinding('style.backgroundColor') backgroundColor: string = "transparent";
  @HostBinding('style.color') textColor: string = "#ffffff";
  constructor() { }

  @HostListener('mouseenter') mouseover(eventData:Event){
    this.backgroundColor = "#f5f5f5";
    // this.textColor = "#ffffff";
  }
  @HostListener('mouseleave') mouseleave(eventData:Event){
    this.backgroundColor = "transparent";
    // this.textColor = "lightslategrey";
  }
  // @HostListener('click') onClcik(e:Event){
  //   this.backgroundColor = "#f5f5f5";

  // }

}
