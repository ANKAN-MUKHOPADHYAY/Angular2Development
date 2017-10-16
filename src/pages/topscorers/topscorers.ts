import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { QuestionsProvider } from '../../providers/questions/questions';
/**
 * Generated class for the TopscorersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-topscorers',
  templateUrl: 'topscorers.html',
})
export class TopscorersPage {
  scores: any;
  constructor(public nav: NavController, public navParams: NavParams, private auth: AuthService, private quizFactory: QuestionsProvider) {
    this.quizFactory.quizTopScorer().subscribe(success => {
      this.scores = success;
    },
    error => {
      console.log(error);
    });
  }

  
  public logout() {
      this.auth.logout().subscribe(succ => {
        this.nav.setRoot('RegisterPage');
      });
  }

  public goToHome() {
  	this.nav.setRoot('HomePage');
  }

}
