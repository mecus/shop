import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TaxanomyService } from '../../services/taxanomy.service';

@Component({
  selector: 'new-dept',
  template: `
    <h1>Store Department</h1>
    <form>
        <div class="form-input">
            <input class="form-control" #dept  type="text" required placeholder="Department Name">
            <input class="form-control" #dcode type="text" required placeholder="Department Code">
        </div>
        <div class="save-btn">
            <button (click)="save(dept.value, dcode.value)" color="accent" md-raised-button> Save Department</button>
        </div>
    </form>
    <div>
        <table class="table table-striped">
          <thead class="thead-inverse">
            <tr>
              <th>Department</th>
              <th>Store Code</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let dept of depart | async">
              <td>{{dept.name}}</td>
              <td>{{dept.code}}</td>
              <td (click)="delete(dept.$key)"><md-icon>delete</md-icon></td>
            </tr>
            </tbody>
          </table>
    </div>
  `,
  styles: [`
    .form-input{
      margin: 10px;
    }
    .form-input input{
      margin-bottom: 5px;
    }
    .save-btn{
      margin: 0 auto;
      text-align: center;
      padding: 10px;
    }
  `]
})
export class NewDeptComponent implements OnInit {
    depart;
  constructor(private _ts:TaxanomyService) {
    this.depart = _ts.getDepartment();
   }

  ngOnInit() {
  }
  save(dept, code){
    let department = {
        name: dept, code: code
    }
    this._ts.createDepartment(department);
  }
  delete(key){
    this._ts.removeDepartment(key);
  }
}