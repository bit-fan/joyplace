import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UserService } from '../../../services/user.service';
@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  isEditing = false;
  nickname = 'haha';
  dispNickname = '';
  userInfo: any = {};
  constructor(private userSvc: UserService) { }

  ngOnInit() {
    this.userSvc.userData.subscribe(data => {
      this.userInfo = data;
      this.dispNickname = this.userInfo.nickname;
      console.log('user updated', this.userInfo);
    })
  }
  setEdit(flag) {
    this.isEditing = flag;
    if (flag) {
      this.dispNickname = this.userInfo.nickname;
    }
  }
  confirm() {
    this.setEdit(false);
    console.log('update', this.dispNickname);
    this.userSvc.updateUserInfo({ nickname: this.dispNickname });
  }
}
