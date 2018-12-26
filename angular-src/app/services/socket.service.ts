import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { ReplaySubject, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: any;
  // socket = new ReplaySubject(1);
  public userEvt = new Subject();
  public socketMsg: any;
  //  = new Subject();
  constructor() {
    let socket = io();
    console.log(socket);
    // socket.on('message', (data) => {
    //   console.log("Received message from Websocket Server")
    //   // observer.next(data);
    //   // this.socketMsg.next(data);
    // })
    socket.on('user', (data) => {
      console.log('rece user', data);
      this.userEvt.next(data);
    });
    this.socket = socket;
    // this.socketMsg = new Subject();
  }
  // getSocket() {
  //   return this.socket;
  // }
  disconnect() {
    // this.socket.subscribe(obj => {
    //   obj['disconnect']();
    // });
  }
  emit(key, data, para = {}) {
    let sendObj = data;
    if (para) {
      sendObj = Object.assign({}, { data: data }, para);
    }
    this.socket.emit(key, sendObj);
  }
}
