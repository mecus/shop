import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { ProductService } from '../../../services/product.service';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'sub-menu',
  templateUrl: './sub-menu.html',
  styleUrls:['./sub-menu.scss']
})
export class SubMenuComponent implements OnInit {
    category;
    departments;
    selected: boolean =false;
    loginWindow:boolean;

  constructor(private router:Router, private productService:ProductService, private _http:Http, private route:ActivatedRoute) {
      
   }

  selectedDept(dept){
    dept.selected = false;
    this.router.navigate(["/products/?", {dept_id:dept._id, name:dept.name, selected: true, code_number: dept.code}]);
    setTimeout(()=>{
       dept.selected = true;
    }, 500)
  }
  
  ngOnInit() {
    this.productService.getProducts().subscribe((data)=>{
      this.departments =data.department;
    });
  }

}