import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './authentication.service';

@Component({
    selector: 'login',
    template: `
        <div class="container jumbotron">
            <h3>Login</h3>
            <button md-raised-button (click)="facebooklogin()"> Facebook</button>
            <button md-raised-button (click)="googlelogin()"> Google</button>
            <button md-raised-button (click)="signOut()"> Sign Out</button>
        </div>
    `,
    styles: [``]
})

export class LoginComponent implements OnInit {

    constructor(private authService:AuthService){}

    facebooklogin(){
        this.authService.loginFacebook();
        this.authService.authChange();
    }
    googlelogin(){
        this.authService.loginGoogle();
        this.authService.authChange();
    }
    signOut(){
        this.authService.logout();
        this.authService.authChange();
    }
    ngOnInit(){
        
    }
}