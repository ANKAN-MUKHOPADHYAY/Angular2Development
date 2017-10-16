import { Component } from '@angular/core';
import { AlertController, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
 
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = { username: '', email: '', mobnum: '', password: '' };
 
  public loginAccount() {
    window.location.href ='http://localhost:8100';
  }

  constructor(private auth: AuthService, private alertCtrl: AlertController) { }
 
  public register() {

    this.auth.register(this.registerCredentials).subscribe(success => {
      console.log(success);
      if (success) {
        this.createSuccess = true;

        this.showPopup("Success", "Account created. Kindly Login");
      } else {
        this.showPopup("Error", "Problem creating account. Please Try Again.");
      }
    },
    error => {
      this.showPopup("Error", error);
    });
  }
 
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              window.location.reload();
            }
          }
        }
      ]
    });
    alert.present();
  }
}