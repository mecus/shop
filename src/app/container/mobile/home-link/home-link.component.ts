import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'home-link',
    templateUrl: 'home-link.component.html',
    styleUrls: ['home-link.component.scss']
})

export class HomeLinkComponent implements OnInit, OnChanges {
    @Input() openDialog = "close";
    constructor(private _router:Router){}

    goHome(){
        setTimeout(()=>{
            this._router.navigate(["/"]);
        }, 300);
        
    }
    goToCart(){
        setTimeout(()=>{
            this._router.navigate(["/shop/basket"]);
        }, 300);      
    }

    ngOnInit(){

        if(this.openDialog == "open"){
            let holderDom = document.getElementById('link-container');
            let domEl = document.getElementById('link-inner');
    
            holderDom.style.display = "block";
            setTimeout(()=>{
                domEl.style.marginRight = "0px";
                domEl.style.transition = "0.2s";
            }, 100);
           
        }else if(this.openDialog == "close"){
            let holderDom = document.getElementById('link-container');
            let domEl = document.getElementById('link-inner');
    
            holderDom.style.display = "none";
            domEl.style.marginRight = "-150px";
        }
    }
    ngOnChanges(openDialog){
        if(this.openDialog == "open"){
            let holderDom = document.getElementById('link-container');
            let domEl = document.getElementById('link-inner');
    
            holderDom.style.display = "block";
    
            setTimeout(()=>{
                domEl.style.marginRight = "0px";
                domEl.style.transition = "0.2s ease-in-out";
            }, 100);
        }else if(this.openDialog == "close"){
            let holderDom = document.getElementById('link-container');
            let domEl = document.getElementById('link-inner');
    
            holderDom.style.display = "none";
    
            domEl.style.marginRight = "-150px";
        }
    }
}