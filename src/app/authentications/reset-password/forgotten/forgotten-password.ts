import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'forgot-password',
    templateUrl: 'forgotten-password.html',
    styleUrls: ['forgotten-password.scss']

})

export class ForgorttenPassword implements OnInit{
    notify: string;
    color;
    constructor(private _af:AngularFireAuth){

    }

    submitEmailReset(email){
        if(!email){
            this.color = 'red';
            return this.notify = "please provide a valid email";
        }
        if(email){
            if(email.includes('@') && email.includes('.')){
                this._af.auth.sendPasswordResetEmail(email).then((res)=>{
                    console.log(res);
                    this.color = 'green';
                    this.notify = "your email was submitted, please check your inbox and click on the link.";
                   
                }).catch((err)=>{
                    this.color = 'red';
                    this.notify = err.message; //auth/user-not-found
                })
            }
            
        }
        
    }
    ngOnInit(){

    }
}