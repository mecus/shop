import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
    selector: 'change-password',
    templateUrl: 'change-password.html',
    styleUrls:['change-password.scss']

})

export class ChangePassword implements OnInit{
    hide = true;
    color: string = 'lightslategray';
    flashNotice: string = "please enter new password!";
    constructor(){

    }
    changePassword(password){
        if(password == ""){
            this.color = 'red';
            return this.flashNotice = "password must not be empty!";
        }
        let user = firebase.auth().currentUser;
        let newPassword = password;
        user.updatePassword(newPassword).then((u) => {
            this.color = 'lightgreen';
            this.flashNotice = "Password updated";
            console.log(u);
          // Update successful.
        }).catch((error) => {
            this.color = 'red';
            this.flashNotice = error.message;
          // An error happened.
        });
        
    }

    ngOnInit(){

    }
}