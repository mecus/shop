import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        ServerModule, AppModule,
        NoopAnimationsModule
    ],
    bootstrap: [ AppComponent ]
})
export class AppServerModule {}