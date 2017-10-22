import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PostCodeService } from '../postcode.service';
import { StorageService } from '../../../services/storage.service';
import { AuthService } from '../../../authentications/authentication.service';


@Component({
    selector: 'post-code',
    templateUrl: './postcode.compoent.html',
    styleUrls: ['./postcode.compoent.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostcodeComponent implements OnInit, OnChanges {
    postcodecomponentdom;
    spinning:boolean=false;
    succex:boolean = false;
    failureMsg:string;
    inputLabel: string = "Please enter you postcode";
    @Input() requestPost:string;
    currentUser;
    constructor(private storeService:StorageService, 
        private postcodeService:PostCodeService,
        private authService:AuthService){
            authService.authState().subscribe(user=>{
                this.currentUser = user;
            });
        }
    
    setPostcode(postCode){
        let postcode = postCode.toUpperCase();
        if(!this.currentUser && postcode){
            this.storeService.storeData('postcode', postcode);
        }
        if(postcode){
            this.spinning = true;
            // this.storeService.storeData('postcode', postcode);
            this.postcodeService.findAddres(postcode)
            .subscribe((address)=>{
                console.log(address.addresses);
                // let addressFound = address.addresses[0];
                if(address.addresses){
                    this.succex = true;
                    this.spinning = false;
                    setTimeout(()=>{
                        this.postcodecomponentdom.style.display = "none";
                    }, 5000);
                    // this.storeService.storeData('postcode', postcode);
                
                }else{
                    this.failureMsg = "Sorry we can not deliver to you at this moment"; 
                    this.spinning = false;
                }
            },(err)=>{
                if(err){
                    this.failureMsg = "Sorry your Address can not be found!";
                    this.spinning = false;
                }
            })
        }else{
            this.inputLabel = "Sorry we didn't recognise your postcode, please check and try again.";
        }
        
    }
    closeX(){
        this.inputLabel = "Please enter you postcode";
        let domE = document.getElementById('post-alert');
        domE.style.display = "none";
    }

    ngOnInit(){
        this.postcodecomponentdom = document.getElementById('post-alert');
    }
    ngOnChanges(){
        if(this.requestPost){
            // let domE = document.getElementById('post-alert');
            this.postcodecomponentdom.style.display = "block";
        }
        
    }
}