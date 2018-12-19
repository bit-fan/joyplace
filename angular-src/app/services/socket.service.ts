import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: any;
  public socketMsg: any;
  //  = new Subject();
  constructor() {
    this.socketMsg = new Subject();
  }
  disconnect() {
    this.socket.disconnect();
  }
  connect() {
    this.socket = io();
    console.log(this.socket);
    this.socket.on('message', (data) => {
      console.log("Received message from Websocket Server")
      // observer.next(data);
      this.socketMsg.next(data);
    })
  }

  //   subject.next('missed message from Subject');

  //   subject.subscribe(v => console.log(v));

  // subject.next('hello from subject!');


}
