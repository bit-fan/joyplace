import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { SocketService } from './socket.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  socket;
  userData = new ReplaySubject(1);
  constructor(private skt: SocketService) {
    // this.userData.next({ nickname: 'hghg', where: 'here' });
    this.skt.userEvt.subscribe(data => {
      console.log('usr evt', data);
      this.setUserInfo(data);
    });
  }

  setUserInfo(data) {
    this.userData.next(data);
  }
  updateUserInfo(data) {
    this.skt.emit('user', data, { req: { type: 'updateUser' } });
  }
}
