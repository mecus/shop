import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { MailerService } from "../../../services/mailer.service";
import { ProgressService } from '../../../services/checkout-progress.service';

@Component({
  selector: 'check-out-menu',
  templateUrl: 'check-out-menu.component.html',
  styleUrls: ['check-out-menu.component.scss']
})
export class CheckOutMenuComponent implements OnInit, OnChanges {

  checkProgress=["billing", "payment"];
  progress$;
  billIcon; payIcon; ordIcon; delivIcon; finIcon
  constructor(private mailerService:MailerService, private progressService:ProgressService) { }

  //This function has to be removed later
  sendMail(){
    let mail = {
      email: "londoncityroast@gmail.com",
      subject: "Thank You",
      text: `
          Thank you John
          We are so grateful that you visited our website, feel free to let us know what you think.
          uRGy Team.
          `,
      html: `
        <h3>Thank you Lucy</h3>
        <p>We are so grateful that you visited our website, feel free to let us know what you think.</p>
        <h5>uRGy Team.</h5>
      `
    };
   
    this.mailerService.sendWelcomeEmail(mail).subscribe((res)=>{
      console.log(res);
    }, ()=> console.log("completed"));
  }

  ngOnInit() {
    // setTimeout(()=>{
    //   this.checkProgress.forEach((prog)=>{
    //     // this.setProgress(prog);
    //   })
    // }, 500);
    setTimeout(()=>{
      this.progressService.getProgress().subscribe((prog)=>{
        // console.log(prog);
        prog.forEach((res)=>{
           this.setProgress(res.name);
        })
        
      });
    }, 0)
   
  }
  ngOnChanges(){
  }


  setProgress(prog){
    let billing = document.getElementById('billing');
    let payment = document.getElementById('payment');
    let delivery = document.getElementById('delivery');
    let order = document.getElementById('order');
    let finish = document.getElementById('finish');

    switch(prog){
      case 'billing':
        billing.style.fontSize = "18px";
        billing.style.color = "#009688";
        billing.style.fontWeight = "bold";
        this.billIcon = true;
        break;
      case 'payment':
        payment.style.fontSize = "18px";
        payment.style.color = "#009688";
        payment.style.fontWeight = "bold";
        this.payIcon = true;
        break;
      case 'delivery':
        delivery.style.fontSize = "18px";
        delivery.style.color = "#009688";
        delivery.style.fontWeight = "bold";
        this.delivIcon = true;
        break;
      case 'order':
        order.style.fontSize = "18px";
        order.style.color = "#009688";
        order.style.fontWeight = "bold";
        this.ordIcon = true;
        break;
      case 'finish':
        finish.style.fontSize = "18px";
        finish.style.color = "#009688";
        finish.style.fontWeight = "bold";
        this.finIcon = true;
        break;
      default:
        return;
    }
  }

}
