import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, 
    RequestOptionsArgs, Headers, Response, } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';

@Injectable()

export class MailerService {
    url:string = "http://localhost:5000/mail";
    constructor(private _http:Http){

    }

    sendWelcomeEmail(mail){
        let option:RequestOptions = new RequestOptions({
            headers: new Headers({
                "Content-Type": "application/json"
            })
        });
        let mailOption = {
            email: mail.email,
            subject: mail.subject,
            text: mail.text,
            html: mail.html
        }
       return this._http.post(this.url, mailOption, option);
    }
}