import { Component, Input } from '@angular/core';

import { AdComponent }      from '../ad.component';

@Component({
  template: `
    <div class="cat-ad">
      <div class="row">
        <div class="col-lg-4">
          <h2>{{data.headline}}</h2> 
          {{data.body}}
        </div>
        <div class="col-lg-8">
          <img [src]="data.photo_url">
        </div>
      </div>
      
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