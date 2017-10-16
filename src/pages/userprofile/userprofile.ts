import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading, ModalController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ModalPage } from '../modal/modal';
/**
 * Generated class for the UserprofilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserprofilePage {
	loading: Loading;
	user_name: any;
	user_mobile: any;
	user_email: any;
	profile_picture: any;
	constructor(public nav: NavController, public modalCtrl: ModalController, public navParams: NavParams, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
		var body = {
			'UID': sessionStorage.getItem('UID')
		};
		this.auth.getUserInfo(body).subscribe(success => {
			if(success.profile_picture == "") {
				this.profile_picture = 'http://localhost:8100/assets/images/profilepics/default.png';
			} else {
				this.profile_picture = success.profile_picture;
			}
		  	this.user_mobile = success.user_mobile;
	      	this.user_name = success.user_name;
	      	this.user_email = success.user_email;
	    },
	    error => {
	      //this.showPopup("Error", error);
	    });
	} 
	public openBasicModal() {
	    let myModal = this.modalCtrl.create(ModalPage);
	    myModal.present();
	}

	public updateDetails(){
		var data = {
			'UID' : sessionStorage.getItem('UID'),
			'user_name' : this.user_name,
			'user_email' : this.user_email,
			'user_mobile' : this.user_mobile
		}
		this.showLoading()
	    this.auth.updateProfile(data).subscribe(allowed => {
	      console.log(allowed);
	      this.showAlert(allowed.message);
	    },
	      error => {
	        this.showError(error);
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



	showLoading() {
	    this.loading = this.loadingCtrl.create({
	      content: 'Please wait...',
	      dismissOnPageChange: true
	    });
	    this.loading.present();
	}
	
	showAlert(text){
		this.loading.dismiss();
	 
	    let alert = this.alertCtrl.create({
	      title: 'Completed',
	      subTitle: text,
	      buttons: ['OK']
	    });
	    alert.present(prompt);
	}

	showError(text) {
	    this.loading.dismiss();
	 
	    let alert = this.alertCtrl.create({
	      title: 'Fail',
	      subTitle: text,
	      buttons: ['OK']
	    });
	    alert.present(prompt);
	}
}
