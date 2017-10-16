import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuestionsetPage } from './questionset';

@NgModule({
  declarations: [
    QuestionsetPage,
  ],
  imports: [
    IonicPageModule.forChild(QuestionsetPage),
  ],
  exports: [
    QuestionsetPage
  ]
})
export class QuestionsetPageModule {}
