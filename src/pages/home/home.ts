import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { QuestionsProvider } from '../../providers/questions/questions';
//import { RegisterPage } from '../register/register';

 
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: any;
  loading: Loading;

  constructor(private nav: NavController, private auth: AuthService, private quizFactory: QuestionsProvider, private loadingCtrl: LoadingController) {
    if(sessionStorage.getItem('userLoggedIn') != 'true'){
      this.nav.setRoot('RegisterPage');
    } else {
      this.quizFactory.quizCategory().subscribe(success => {
        this.items = success;
      },
      error => {
        console.log(error);
      });
    }
  }

  itemTapped(event, item) {
    this.showLoading()
    this.nav.setRoot('QuestionsetPage', {
      item: item
    });
  }



  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  public logout() {
      this.auth.logout().subscribe(succ => {
        this.nav.setRoot('RegisterPage');
      });
  }

  public otherOptions() {
    this.nav.setRoot('SettingsPage');
  }
}