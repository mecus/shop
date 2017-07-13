import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ad-host]'
})
export class AdvertDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
