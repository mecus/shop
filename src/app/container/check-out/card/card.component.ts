import { Component, OnInit, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { StorageService } from '../../../services/storage.service';
import { Observable } from 'rxjs/Observable';
import { PaymentService } from "../../../services/payment.service";
import { WindowService } from "../../../services/window.service";

@Component({
  selector: 'pay-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.scss']
})
export class CardComponent implements OnInit, AfterViewInit {
  document;
  cardform;
  card;
  cardType;
  creditCard;
  fieldErrorMsg;
  @Input() customerId:string;
  @Output() returnResult:EventEmitter<any> = new EventEmitter<any>();
  constructor(private accountService:AccountService, 
    private storeService:StorageService, private _fb:FormBuilder,
    public paymentService:PaymentService, private windowService:WindowService) {
      this.document = this.windowService.getDocumentRef();
  }
    
  
  showNewCardForm(){
      let cardform = this.windowService.getDocumentRef().querySelector('#cardForm');
      let oldcard = this.windowService.getDocumentRef().querySelector('#card-fetch');
      if(cardform.style.display == "block"){
        cardform.style.display = "none";
        // oldcard.style.display = "block";
      }else{
        cardform.style.display = "block";
        // oldcard.style.display = "none";
      }
      

  }
 
  ngOnInit() {
    // this.checkForCardPresent();
    this.braintreeHostedPage();
    
  }
  
  ngAfterViewInit(){
    
  }

  // checkForCardPresent(){
  //   this.accountService.getAccount(this.storeService.retriveData('user')['email'])
  //   .subscribe((account)=>{
  //      this.paymentService.fetchCard(account.ac_no).subscribe((cards)=>{
  //       this.card = cards.maskedNumber;
  //       this.cardType = cards.cardType;
  //       if(cards){
  //         this.cardform.style.display = "block";
  //       }else{
  //         this.cardform.style.display = "block";
  //       }
  //       // console.log(cards);
  //     });
  //   })
  // }

  braintreeHostedPage(){
      let form = this.windowService.getDocumentRef().querySelector('#my-sample-form');
      let submit = this.windowService.getDocumentRef().querySelector('input[type="submit"]');
      // let cardform = this.windowService.getDocumentRef().querySelector('#cardForm');
      // let proceed = this.windowService.getDocumentRef().querySelector('#continue-payment');
   

      this.windowService.getWindowObject().braintree.client.create({
        authorization: this.storeService.retriveData('token')
      }, (clientErr, clientInstance)=> {
        if (clientErr) {
          console.error(clientErr);
          return;
        }
        // console.log(clientInstance);
        // This example shows Hosted Fields, but you can also use this
        // client instance to create additional components here, such as
        // PayPal or Data Collector.

        this.windowService.getWindowObject().braintree.hostedFields.create({
          client: clientInstance,
          styles: {
            'input': {
              'font-size': '14px'
            },
            'input.invalid': {
              'color': 'red'
            },
            'input.valid': {
              'color': 'green'
            }
          },
          fields: {
            number: {
              selector: '#card-number',
              placeholder: '4111 1111 1111 1111'
            },
            cvv: {
              selector: '#cvv',
              placeholder: '123'
            },
            expirationDate: {
              selector: '#expiration-date',
              placeholder: '10/2019'
            },
            postalCode: {
              selector: '#postal-code',
              placeholder: 'SE14 5GH'
            }
           
           
          }
        }, (hostedFieldsErr, hostedFieldsInstance)=> {
          if (hostedFieldsErr) {
            this.fieldErrorMsg = hostedFieldsErr.message;
            console.error(hostedFieldsErr);
            return;
          }
          
          submit.removeAttribute('disabled');

          form.addEventListener('submit', (event)=> {
            event.preventDefault();

            hostedFieldsInstance.tokenize((tokenizeErr, payload)=> {
              if (tokenizeErr) {
                this.fieldErrorMsg = "Please fill in a valid card details";
                console.error(tokenizeErr);
                return;
              }
              
              // cardform.style.display = "none";
              // proceed.style.display = "block";
              this.paymentService.createPaymentMethod(payload.nonce, this.customerId, "card")
                .subscribe((res)=>{
                  this.returnResult.emit(res);
                  // console.log(res);
                });
              // this.checkForCardPresent();

            });
          }, false);
        });
      });
  }
}
