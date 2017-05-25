import { Component, OnInit } from '@angular/core';
import * as cat from '../../../store/actions/category.action';
import { Store } from "@ngrx/store";
import { TaxanomyService } from '../../../services/taxanomy.service';


@Component({
  selector: 'sub-menu',
  templateUrl: './sub-menu.html',
  styleUrls:['./sub-menu.scss']
})
export class SubMenuComponent implements OnInit {
    category;


  constructor(private store:Store<{}>, private _ts:TaxanomyService) {
      _ts.getCategory().subscribe((group)=>{
       this.category = group.filter((cat)=> cat.category == "Frozen Food")
        
      });
      
   }
   selectCategory(selected:string){
       this._ts.getCategory().subscribe((group)=>{
       this.category = group.filter((cat)=> cat.category == selected)
        
      });
   }

  frozenFood(){
      this.store.dispatch({type: cat.SEARCH_CAT, payload:{category:'Frozen Food', code_number: "17889789"} });
      this.selectCategory("Frozen Food");
    }
  dryFood(){
      this.store.dispatch({type: cat.SEARCH_CAT, payload:{category: 'Dry Food', code_number: "209887445"} });
      this.selectCategory("Dry Food");
  }
   beverages(){
      this.store.dispatch({type: cat.SEARCH_CAT, payload:{category: 'Baverages', code_number: "367885423"} });
      this.selectCategory("Baverages");
  }
   drinks(){
      this.store.dispatch({type: cat.SEARCH_CAT, payload:{category: 'Drinks', code_number: "4564332459"} });
      this.selectCategory("Drinks");
  }
  ingredients(){
      this.store.dispatch({type: cat.SEARCH_CAT, payload:{category: 'Ingredients', code_number: "4564332459"} });
      this.selectCategory("Ingredients");
  }
  bakery(){
      this.store.dispatch({type: cat.SEARCH_CAT, payload:{category: 'Bakery', code_number: "4564332459"} });
      this.selectCategory("Bakery");
  }

  ngOnInit() {
  }

}