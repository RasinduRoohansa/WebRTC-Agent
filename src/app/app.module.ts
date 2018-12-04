import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { PublisherComponent } from './publisher/publisher.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { OpentokService } from './opentok.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PublisherComponent,
    SubscriberComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [OpentokService],
  bootstrap: [AppComponent]
})
export class AppModule { }
