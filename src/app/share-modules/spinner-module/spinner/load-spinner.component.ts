import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'nge-load-spinner',
    templateUrl: 'load-spinner.component.html',
    styleUrls: ['load-spinner.component.scss']
})

export class LoadSpinnerComponent implements OnInit, OnChanges {
    @Input() start:boolean = false;
    spin: boolean = this.start;

    constructor(){
 
    }

    ngOnInit(){

    }
    ngOnChanges(start){
        this.spin = this.start;
    }

}