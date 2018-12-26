import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AMaterialModule } from '../a-material/a-material.module';

import { LeftNavRoutingModule } from './left-nav-routing.module';
import { LeftWrapperComponent } from './left-wrapper/left-wrapper.component';
import { UserComponent } from './user/user.component';
import { LobbyComponent } from './lobby/lobby.component';

@NgModule({
  declarations: [LeftWrapperComponent, UserComponent, LobbyComponent],
  imports: [
    CommonModule,
    FormsModule,
    LeftNavRoutingModule,
    AMaterialModule
  ],
  exports: [LeftWrapperComponent]
})
export class LeftNavModule { }
