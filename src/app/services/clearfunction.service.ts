import { Injectable } from '@angular/core';
import { WindowService } from "./window.service";

@Injectable()


export class ClearHeighlightMenu {
    document;
    constructor(private windowRef:WindowService){
        this.document = this.windowRef.getDocumentRef();
    }

    clearMenu(){
        let i;
        let tab = this.document.getElementsByClassName('nav-link');
        for (i = 0; i < tab.length; i++) {
            // tab[i].className = tab[i].className.replace("active", "");
            tab[i].style.backgroundColor = "transparent";
            tab[i].style.color = "lightslategrey";
            
        }
    }
}