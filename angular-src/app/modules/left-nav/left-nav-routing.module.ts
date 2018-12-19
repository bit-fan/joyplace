import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeftWrapperComponent } from './left-wrapper/left-wrapper.component';
const routes: Routes = [
  { path: '', component: LeftWrapperComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeftNavRoutingModule { }
