import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { StorageService } from '../../../services/storage.service';
import { Observable } from 'rxjs/Observable';
import { PaymentService } from "../../../services/payment.service";
import { WindowService } from "../../../services/window.service";
import { AuthService } from "../../../authentications/authentication.service";


@Component({
  selector: 'app-paypal',
  templateUrl: 'paypal.component.html',
  styleUrls: ['paypal.component.scss']
})
export class PaypalComponent implements OnInit {
  @Output() returnResult:EventEmitter<any> = new EventEmitter<any>();
  document;
  window;
  constructor(private windowRef:WindowService, private storeService:StorageService,
    private paymentService:PaymentService, private accountService:AccountService,
    private authService:AuthService) { 
    this.document = windowRef.getDocumentRef();
    this.window = windowRef.getWindowObject();
  }

  ngOnInit() {
    this.braintreePaypal();
  }

  braintreePaypal(){
  
    this.window.braintree.client.create({
      authorization: this.storeService.retriveData('token')
    },(clientErr, clientInstance)=> {
      // Stop if there was a problem creating the client.
      // This could happen if there is a network error or if the authorization
      // is invalid.
      if (clientErr) {
        console.error('Error creating client:', clientErr);
        return;
      }

      this.window.braintree.dataCollector.create({
        client: clientInstance,
        paypal: true
      }, (err, dataCollectorInstance)=> {
        if (err) {
          // Handle error
          console.log(err);
          return;
        }
        // At this point, you should access the dataCollectorInstance.deviceData value and provide it
        // to your server, e.g. by injecting it into your form as a hidden input.
        var myDeviceData = dataCollectorInstance.deviceData;
        // console.log(dataCollectorInstance);
        
        this.storeService.storeData('deviceData', myDeviceData);
        //dataCollectorInstance.teardown();
      });

    
      // Create a PayPal Checkout component.
      this.window.braintree.paypalCheckout.create({
          client: clientInstance
        }, (paypalCheckoutErr, paypalCheckoutInstance)=> {
      
        // Stop if there was a problem creating PayPal Checkout.
        // This could happen if there was a network error or if it's incorrectly
        // configured.
        if (paypalCheckoutErr) {
          console.error('Error creating PayPal Checkout:', paypalCheckoutErr);
          return;
        }
    
        // Set up PayPal with the checkout.js library
        this.window.paypal.Button.render({
          env: 'sandbox', // or 'production'
    
          payment: ()=> {
            return paypalCheckoutInstance.createPayment({
              flow: 'vault',
              billingAgreementDescription: 'You have agreed to provide your details for this payment',
              enableShippingAddress: false,
              // shippingAddressEditable: false,
              // shippingAddressOverride: {
              //   recipientName: 'Scruff McGruff',
              //   line1: '1234 Main St.',
              //   line2: 'Unit 1',
              //   city: 'Chicago',
              //   countryCode: 'US',
              //   postalCode: '60652',
              //   state: 'IL',
              //   phone: '123.456.7890'
              // }
            });
          },
    
          onAuthorize: (data, actions)=> {
            return paypalCheckoutInstance.tokenizePayment(data)
              .then((payload)=> {
                // Submit `payload.nonce` to your server.
                // console.log(payload);
                this.authService.authState().subscribe((user)=>{
                this.paymentService.createPaymentMethod(payload.nonce, user.uid, "paypal")
                  .subscribe((res)=>{
                    this.returnResult.emit(res);
                  });
                })
              });
          },
    
          onCancel: (data)=> {
            console.log('checkout.js payment cancelled');
          },
    
          onError: (err)=> {
            console.error('checkout.js error', err);
          }
        }, '#paypal-button').then( ()=> {
          // The PayPal button will be rendered in an html element with the id
          // `paypal-button`. This function will be called when the PayPal button
          // is set up and ready to be used.
          // console.log("Paypal Process Completed");
        });
    
      });
    
    });
  }

}
