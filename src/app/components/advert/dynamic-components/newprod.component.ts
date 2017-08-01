import { Component, Input } from '@angular/core';

import { AdComponent }      from '../ad.component';

@Component({
  template: `
    <div *ngIf="data" class="prod-ad">
      <div class="row">
        <div class="col-lg-4">
          <h2>{{data.title}}</h2> 
          {{data.sub_title}}
        </div>
        <div class="col-lg-8">
          <img [src]="data.photo_url">
        </div>
      </div>
    </div>
  `,
  styles: [`
    div>img{
      width: 100%;
    }
  `]
})
export class NewProdComponent implements AdComponent {
  @Input() data: any;

}