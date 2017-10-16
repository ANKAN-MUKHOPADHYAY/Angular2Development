import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopscorersPage } from './topscorers';

@NgModule({
  declarations: [
    TopscorersPage,
  ],
  imports: [
    IonicPageModule.forChild(TopscorersPage),
  ],
  exports: [
    TopscorersPage
  ]
})
export class TopscorersPageModule {}
