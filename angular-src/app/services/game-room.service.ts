
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { SocketService } from './socket.service';
@Injectable({
  providedIn: 'root'
})
export class GameRoomService {
  socket;
  allGameRoom = new ReplaySubject(1);
  constructor(private skt: SocketService) {
    // this.userData.next({ nickname: 'hghg', where: 'here' });
    this.skt.gameRoomEvt.subscribe(data => {
      console.log('game room evt', data);
      // this.setUserInfo(data);
    });
  }

  updateGameRoom(data) {
    this.allGameRoom.next(data);
  }
  getGameRoom() {
    this.skt.emit('gameRoom', {}, { req: { type: 'getAllGameRoom' } });
  }
  // setUserInfo(data) {
  //   this.userData.next(data);
  // }
  // updateUserInfo(data) {
  //   this.skt.emit('user', data, { req: { type: 'updateUser' } });
  // }
}
