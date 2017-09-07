import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute, Params, ParamMap} from '@angular/router';
import { WindowService } from '../../../services/window.service';
@Component({
    selector: 'reset-password',
    templateUrl: 'reset-password.component.html',
    styleUrls: ['reset-password.component.scss']

})

export class ResetPassword implements OnInit{
    notify: string;
    queryParam;
    email;
    hidePage;
    constructor(private _af:AngularFireAuth, private route:ActivatedRoute,
        private _router:Router, private windows:WindowService){

    }

    passwordReset(password){
        if(!password){
            return this.notify = "please provide a new password in the box below";
        }
        
        if(password){
            this._af.auth.confirmPasswordReset(this.queryParam.oobCode, password).then((res)=>{
                this._router.navigate(["/login"]);
            }).catch((err)=>{
                console.log(err);
                this.notify = err.message;
            });  
        }
        
    }

    ngOnInit(){
        this.queryParam = this.route.snapshot.queryParams;
        this.windows.getWindowObject().setTimeout(()=>{
            this.veryFycode();
        }, 2000)
    }
    veryFycode(){
        this._af.auth.verifyPasswordResetCode(this.queryParam.oobCode).then((email)=>{
            this.email = email;
        }).catch((err)=>{
            this.notify = err.message;
            this.hidePage = true;
            // console.log(err);
        })
    }
}