import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
    selector: 'forgot-password',
    templateUrl: 'forgotten-password.html',
    styleUrls: ['forgotten-password.scss']

})

export class ForgorttenPassword implements OnInit{
    notify: string;
    constructor(private _af:AngularFireAuth){

    }

    submitEmailReset(email){
        if(!email){
            return this.notify = "please provide a valid email";
        }
        
        if(email){
            if(email.includes('@') && email.includes('.')){
                this._af.auth.sendPasswordResetEmail(email).then((res)=>{
                    console.log(res);
                    this.notify = "your email was submitted, please check your inbox and click on the link."
                }).catch((err)=>{
                    this.notify = err.message
                })
            }
            
        }
        
    }
    ngOnInit(){

    }
}