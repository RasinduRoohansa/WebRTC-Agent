import {ChangeDetectorRef, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import * as OT from '@opentok/client';
import config from '../config';

@Injectable()
export class OpentokService {

  session: OT.Session;
  token: string;

  streams: Array<OT.Stream> = [];
  changeDetectorRef: ChangeDetectorRef;
  constructor( private http: HttpClient) { }

  getOT() {
    return OT;
  }

  initSession(sessionId, tbToken) {
    if (config.API_KEY && config.TOKEN && config.SESSION_ID) {
      this.session = this.getOT().initSession(config.API_KEY, config.SESSION_ID);
      this.token = config.TOKEN;
      return Promise.resolve(this.session);
    } else {
      return fetch(config.SAMPLE_SERVER_BASE_URL + '/session')
        .then((data) => data.json())
        .then((json) => {
          this.session = this.getOT().initSession(json.apiKey, json.sessionId);
          this.token = json.token;
          return this.session;
        });
    }
  }

  connect() {
    return new Promise((resolve, reject) => {
      console.log('Connected');
      this.session.connect(this.token, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(this.session);
        }
      });
    });
  }
}

