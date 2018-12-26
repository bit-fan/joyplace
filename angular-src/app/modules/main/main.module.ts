import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { AMaterialModule } from '../a-material/a-material.module';
// import { LeftNavModule } from '../left-nav/left-nav.module';
import { MainViewComponent } from './main-view/main-view.component'

import { LeftNavModule } from '../left-nav/left-nav.module';

@NgModule({
  declarations: [MainViewComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    AMaterialModule,
    LeftNavModule
  ]
})
export class MainModule { }
