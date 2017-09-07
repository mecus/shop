import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';

@Injectable()

export class YoutubeService {
    host: string = "https://urgyshop.herokuapp.com/";
    youtubeVideoUrl;
    constructor(private _http:Http){
        this.youtubeVideoUrl = this.host+"api/v1/stores/youtube";
    }

    getYoutubeVideos():Observable<any>{
        return this._http.get(this.youtubeVideoUrl).map((uTube)=>{
            return uTube.json();
        }).catch(this.handleError);
    }

    handleError(err):Observable<any>{
        if (err.status === 302 || err.status === "302"){
            return err.json();
        }else{
            return Observable.throw(new Error(err.status));
        }
    }
}