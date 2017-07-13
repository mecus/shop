import { Component, Input } from '@angular/core';

import { AdComponent }      from '../ad.component';

@Component({
  template: `
    <div class="prod-ad">
      <h2>{{data.title}}</h2> 
      
      {{data.snipet}}
    </div>
  `
})
export class NewProdComponent implements AdComponent {
  @Input() data: any;

}