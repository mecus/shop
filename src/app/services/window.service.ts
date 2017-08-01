import { Injectable } from '@angular/core';

function windowRef():any{
    return window;
}
function documentRef():any{
    return window.document;
}
@Injectable()

export class WindowService {
    constructor(){

    }
    getWindowObject(){
        return windowRef();
    }
    getDocumentRef(){
        return documentRef();
    }
}