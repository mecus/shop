import { Component, OnInit, Input, OnChanges, HostListener, HostBinding} from '@angular/core';
import { animate, trigger, stagger, state, transition, query, style, keyframes} from '@angular/animations';
import * as _ from 'lodash';


@Component({
    selector: 'nge-carousel',
    templateUrl: 'nge-carousel.component.html',
    styleUrls: ['nge-carousel.component.scss'],
    animations: [
        trigger('slideImage', [
            transition('* => *', [ 
            query(':enter', style({opacity: 0}), {optional: true}),
    
            // query(':enter', stagger('200ms', [
            //     animate('.3s ease-in', keyframes([
            //     style({opacity: 0, transform: 'translateY(-20px)', offset: 0}),
            //     style({opacity: 0.5, transform: 'translateY(10px)', offset: 0.3}),
            //     style({opacity: 1, transform: 'translateY(0)', offset: 1})
            //     ]))
            // ]))
            ]),
        ])
    ]
})

export class NgeCarouselComponent implements OnInit, OnChanges{
    carouselImg:string;
    bubbles = [];
    @Input() images;
    @Input() options = {
        width: "100%",
        height: "100%",
        opacity: "1",
        speed: 5000
    };
    counter:number = 0;
    controls:boolean = false;
    // @HostBinding('width') width;
    constructor(){
    }
    next(){
        this.counter++;
        if(this.counter < this.images.length){
            this.carouselImg = this.images[this.counter];
            
        }else{
            this.counter = 0;
            this.carouselImg = this.images[this.counter];
        }
    }
    prev(){
        
        if(this.counter > 0){
            this.counter--;
            this.carouselImg = this.images[this.counter];
            
        }else{
            this.counter = this.images.length - 1;
            this.carouselImg = this.images[this.counter];
        }
        
    }
    
    bubbleSet(){
        var i;
        let bubbleContainer = document.getElementsByClassName('bubble-container')[0];
        for(i = 0; i < this.images.length; i++){
            let bub = document.createElement('span');
            bub.classList.add('buble');
            // bub.innerHTML = '0';
            bubbleContainer.appendChild(bub);
            this.bubbles.push(bub);
        }
        
    }
    loopInterVal = setInterval(()=>{
            this.next();
        }, this.options.speed);

    loopImage(){
        this.loopInterVal;
    }
    imageOption(){
        let domImg = document.getElementById('nge-img');
        domImg.style.width = this.options.width;
        domImg.style.height = this.options.height;
        domImg.style.opacity = this.options.opacity;
    }
    // @HostListener('mouseenter', ['$event']) freezSlide(e){
    //     e.preventDefault();
    //     e.stopPropagation();
    //     clearInterval(this.loopInterVal);
    // }
    // @HostListener('mouseleave', ['$event']) unFreezSlide(e){
    //     e.preventDefault();
    //     e.stopPropagation();
    //     console.log('Unfreezing the slide');
    //     this.carouselImg = this.images[this.counter];
    //     this.loopImage();
    // }

    ngOnInit(){
        this.imageOption();
        if(this.images){
            this.carouselImg = this.images[this.counter];
            this.loopImage();
            this.bubbleSet();
            if(this.images.length > 1){
                this.controls = true;
            }else{
                this.controls = false;
            }
        }
       
        // console.log(this.images);
    }
    ngOnChanges(images){

        if(this.images){
            this.carouselImg = this.images[this.counter];
            this.loopImage();
            this.bubbleSet();
            if(this.images.length > 1){
                this.controls = true;
            }else{
                this.controls = false;
            }
        }

    }


}