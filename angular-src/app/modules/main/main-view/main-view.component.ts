import { Component, OnInit } from '@angular/core';

import { SocketService } from '../../../services/socket.service';

@Component({
  selector: 'main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  constructor(private skt: SocketService) { }

  ngOnInit() {
    console.log('ff');
    // this.skt.socketMsg.subscribe(data => { console.log(data) });
  }

}
