import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  profile_picture: any;
  constructor(public navCtrl: NavController, private auth: AuthService, public navParams: NavParams, public viewCtrl: ViewController) {
  	var body = {
		'UID': sessionStorage.getItem('UID')
	};
	this.auth.getUserInfo(body).subscribe(success => {
	    if(success.profile_picture == "") {
        this.profile_picture = 'http://localhost:8100/assets/images/profilepics/default.png';
      } else {
        this.profile_picture = success.profile_picture;
      }
    },
    error => {
      //this.showPopup("Error", error);
    });
  }



  dismiss() {
    this.viewCtrl.dismiss();
  }
}
