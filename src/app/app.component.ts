import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OpentokService } from './opentok.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ OpentokService ]
})
export class AppComponent implements OnInit {
  title = 'PSI Web RTC';
  session: OT.Session;
  streams: Array<OT.Stream> = [];
  changeDetectorRef: ChangeDetectorRef;
  public device: Device;
  data: any= {};
  restItemsUrl= 'http://localhost:8080/api/v1/Device/requestAgentCall/0719581902';

  constructor(private ref: ChangeDetectorRef, private opentokService: OpentokService, private http: HttpClient) {
    this.changeDetectorRef = ref;
  }

  ngOnInit () {
    // this.http.get(this.restItemsUrl, { headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
    // }).subscribe(data => {
    //   this.device = data as Device;
      this.opentokService.initSession('this.device.sessionId', 'this.device.tbToken').then((session: OT.Session) => {
        this.session = session;
        this.session.on('streamCreated', (event) => {
          this.streams.push(event.stream);
          this.changeDetectorRef.detectChanges();
        });
        this.session.on('streamDestroyed', (event) => {
          const idx = this.streams.indexOf(event.stream);
          if (idx > -1) {
            this.streams.splice(idx, 1);
            this.changeDetectorRef.detectChanges();
          }
        });
      })
        .then(() => this.opentokService.connect())
        .catch((err) => {
          console.error(err);
          alert('Unable to connect. Make sure you have updated the config.ts file with your OpenTok details.');
        });
    // });
  }
}
interface Device {
  sessionId: any;
  tbToken: any;
}
