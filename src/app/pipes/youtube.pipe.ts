import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: 'youtube'
})
export class YoutubePipe implements PipeTransform {

  constructor(private dom:DomSanitizer){

  }
  transform(url: any, args?: any): any {
    return this.dom.bypassSecurityTrustResourceUrl(url);
  }

}
