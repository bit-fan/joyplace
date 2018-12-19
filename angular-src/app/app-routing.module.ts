import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { LeftNavModule } from './modules/left-nav/left-nav.module#LeftNavModule';
const routes: Routes = [
  { path: '', loadChildren: './modules/main/main.module#MainModule' },
  { path: 'left', loadChildren: './modules/left-nav/left-nav.module#LeftNavModule' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
