import { Component, Input } from '@angular/core';

import { AdComponent }      from '../ad.component';

@Component({
  template: `
    <div class="cat-ad">
      <h2>{{data.headline}}</h2> 
      
      {{data.body}}
    </div>
  `,
  styles: [`
    .cat-ad{
        
    }
  `]
})
export class NewCatComponent implements AdComponent {
  @Input() data: any;

}