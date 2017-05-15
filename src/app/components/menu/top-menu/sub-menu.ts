import { Component, OnInit } from '@angular/core';
import * as cat from '../../../store/actions/category.action';
import { Store } from "@ngrx/store";


@Component({
  selector: 'sub-menu',
  template:` 
    <div>
        <div class="sub-menu" color="accent">
            <div class="cat container">
                <ul>
                <li (click)="freshFood()">Fresh Food</li> |
                <li (click)="frozenFood()">Frozen food</li> |
                <li (click)="beverages()">Beverages</li> |
                <li (click)="drinks()">Drink</li> |
                <li>Spices</li> |
                <li>Bakery</li>
                </ul>
            </div>
          
            <md-menu #menu="mdMenu">
            <button md-menu-item>
                <md-icon>dialpad</md-icon>
                <span>Redial</span>
            </button>
            <button md-menu-item disabled>
                <md-icon>voicemail</md-icon>
                <span>Check voicemail</span>
            </button>
            <button md-menu-item>
                <md-icon>notifications_off</md-icon>
                <span>Disable alerts</span>
            </button>
        </md-menu>
    
  
    </div>
    </div>
   `,
  styles:[`
        .sub-menu{
            background-color: #000;
            height: 40px;
            color: lightgrey;
            padding-top: 10px;
            margin-bottom: 10px;
        }
        md-toolbar{
            height:30px;
        }
        .cat{
            margin:0px;
            padding-left:30px;
        }
        .cat ul li{ 
            display: inline-block;
            margin:0px;
        }
  `]
})
export class SubMenuComponent implements OnInit {

  constructor(private store:Store<{}>) { }

  freshFood(){
      this.store.dispatch({type: cat.SEARCH_CAT, payload:{category:'Fresh Food', code_number: "17889789"} });
  }
  frozenFood(){
      this.store.dispatch({type: cat.SEARCH_CAT, payload:{category: 'Frozen Food', code_number: "209887445"} });
  }
   beverages(){
      this.store.dispatch({type: cat.SEARCH_CAT, payload:{category: 'Beverages', code_number: "367885423"} });
  }
   drinks(){
      this.store.dispatch({type: cat.SEARCH_CAT, payload:{category: 'Drinks', code_number: "4564332459"} });
  }

  ngOnInit() {
  }

}