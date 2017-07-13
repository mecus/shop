import { Component, Input, AfterViewInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { AdvertDirective } from '../../directives/advert.directive';
import { AdItem } from './ad-item';
import { AdComponent } from './ad.component';


@Component({
  selector: 'app-advert',
  template: `
    <div class="container">
      <div class="jumbotron">
        <ng-template ad-host></ng-template>
      </div>
    </div>
  `
})
export class BannerComponent implements AfterViewInit, OnDestroy {
  @Input() ads: AdItem[];
  currentAddIndex: number = -1;
  @ViewChild(AdvertDirective) adHost: AdvertDirective;
  subscription: any;
  interval: any;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterViewInit() {
    this.loadComponent();
    this.getAds();
  }
  ngOnDestroy(){
    clearInterval(this.interval);
  }
  loadComponent() {
    this.currentAddIndex = (this.currentAddIndex + 1) % this.ads.length;
    let adItem = this.ads[this.currentAddIndex];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 5000);
  }

}
